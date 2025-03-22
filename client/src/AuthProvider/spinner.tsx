import { Loader } from 'lucide-react'; // Import the Loader icon from lucide-react

const LoadingSpinner = () => {
  return (
    <div style={styles.overlay}>
      <Loader size={48} style={styles.spinner} />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
    zIndex: 9999, 
  },
  spinner: {
    animation: 'spin 1s linear infinite', // Spin animation for the loader
  },
};

export default LoadingSpinner;
