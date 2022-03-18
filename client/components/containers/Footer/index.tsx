import type { NextPage } from "next";
import Image from "next/image";

const FooterContainer: NextPage = () => {
    return (
        <footer className="flex flex-1 py-8 border-t border-solid border-gray-200 justify-center items-center">
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by
                <span className="h-1 ml-4">
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </footer>
    );
};

export default FooterContainer;
