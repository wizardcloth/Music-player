import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "music",
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error("Error in uploading file to cloudinary");
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please provide both audio and image file" });
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // const song = new Song({
        //     title,
        //     artist,
        //     imageUrl,
        //     audioUrl,
        //     duration,
        //     albumId : albumId || null,
        // });
        // await song.save();

        const imageUrl = await uploadToCloudinary(imageFile);
        const audioUrl = await uploadToCloudinary(audioFile);
        let song = await Song.create({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId: albumId || null,
        });

        // if (albumId) {
        //     const album = await Album.findById(albumId);
        //     album.songs.push(song._id);
        //     await album.save();
        // }
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
        }
        res.status(201).json("success");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        // Extract public ID from Cloudinary URLs
        const getPublicId = (url) => {
            // console.log(url);
            const parts = url.split("/");
            return parts[parts.length - 1].split(".")[0]; // Extracts the file name without extension
        };

        const imagePublicId = getPublicId(song.imageUrl);
        const audioPublicId = getPublicId(song.audioUrl);

        // Delete image and audio from Cloudinary
        await Promise.all([
            cloudinary.uploader.destroy(`music/${imagePublicId}`), // Delete image
            cloudinary.uploader.destroy(`music/${audioPublicId}`, { resource_type: "video" }) // Delete audio
        ]);

        // Remove song from album if it belongs to one
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: id } });
        }

        // Delete song from database
        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song:", error);
        next(error);
    }
};


export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ message: "Please provide image file" });
        }
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);
        // console.log(imageUrl);  
        let album = await Album.create({
            title:title,  //title:title or title only both means same
            artist:artist,
            imageUrl,
            releaseYear,
        });
        res.status(201).json("success");
    } catch (error) {
        console.log(error);
        next(error);
    }
}


export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find all songs in the album
        const songs = await Song.find({ albumId: id });

        const getPublicId = (url) => {
            const parts = url.split("/");
            return parts[parts.length - 1].split(".")[0]; // Extracts the file name without extension
        };

        // Collect all Cloudinary delete promises
        let cloudinaryDeletePromises = [];

        songs.forEach(song => {
            if (song.imageUrl) {
                cloudinaryDeletePromises.push(cloudinary.uploader.destroy(`music/${getPublicId(song.imageUrl)}`));
            }
            if (song.audioUrl) {
                cloudinaryDeletePromises.push(cloudinary.uploader.destroy(`music/${getPublicId(song.audioUrl)}`, { resource_type: "video" }));
            }
        });

        // Find the album to delete its image
        const album = await Album.findById(id);
        if (album && album.imageUrl) {
            cloudinaryDeletePromises.push(cloudinary.uploader.destroy(`music/${getPublicId(album.imageUrl)}`));
        }

        // Execute Cloudinary deletions in parallel
        await Promise.all(cloudinaryDeletePromises);

        // Delete songs from the database
        await Song.deleteMany({ albumId: id });

        // Delete album from the database
        await Album.findByIdAndDelete(id);

        res.status(200).json({ message: "Album and songs deleted successfully" });
    } catch (error) {
        console.error("Error deleting album:", error);
        next(error);
    }
};
