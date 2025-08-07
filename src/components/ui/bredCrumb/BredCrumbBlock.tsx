import { Link } from "react-router-dom";

const BredCrumbBlock: React.FC = () => {
    const urlElements: string[] = window.location.pathname.split('/').filter(Boolean);

    const buildLink = (index: number): string => {
        const pathParts = urlElements.slice(0, index + 1);

        return '/' + pathParts.join('/');
    };


    return (
        <div className="flex items-center py-4 px-6">
            {urlElements.map((item, index) => (
                <span className="flex items-center">
                <Link
                    className="
                        relative
                        text-xl font-extrabold uppercase
                        text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600
                        hover:from-orange-500 hover:to-orange-300
                        transition-all duration-300
                        hover:scale-105
                        drop-shadow-[0_0_5px_rgba(255,125,0,0.8)]
                        hover:drop-shadow-[0_0_10px_rgba(255,150,0,1)]
                    "
                    to={buildLink(index)}
                >
                    {item}
                </Link>
                    {index < urlElements.length - 1 && (
                        <span className="mx-3 text-orange-500 text-2xl animate-pulse">{">"}</span>
                    )}
            </span>
            ))}
        </div>
    );

}

export default BredCrumbBlock;
