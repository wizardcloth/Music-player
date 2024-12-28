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
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        //if song belong to the album update the album by removing the song
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: id } });
        }
        await Song.findByIdAndDelete(id);
        res.status(204).json({ message: "Song deleted successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ message: "Please provide image file" });
        }
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);
        let album = await Album.create({
            title:title,  //title:title or title only both means same
            artist:artist,
            imageUrl,
            releaseYear,
        });
        res.status(201).json(album);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(204).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}