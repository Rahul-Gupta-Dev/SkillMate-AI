function Avatar({ src }) {
    return (
        <img
            src={src}
            alt="avatar"
            className="w-11 h-11 rounded-full object-cover"
        />
    );
}

export default Avatar;