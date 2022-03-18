module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                custom: "0px 3px 8px rgba(255, 255, 255, 0.25)",
                custom2: "0 8px 32px 0 rgb(31 38 135 / 37%)",
                custom3: "0 8px 32px 0 rgb(0 0 0 / 72%)",
            },
            keyframes: {
                inOpacity: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
            animation: {
                inOpacity: "3s ease-out 0s 1 inOpacity",
            },
        },
    },
    plugins: [],
};
