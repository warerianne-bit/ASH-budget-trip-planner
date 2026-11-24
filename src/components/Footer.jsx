function Footer({ storageError }) {
  return (
    <footer>
      {storageError ||
        "💾 Your travel plans are automatically saved."}
    </footer>
  );
}

export default Footer;