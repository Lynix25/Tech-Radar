import { type } from "os";

export const Legend: React.FC<{
    type?: string;
    direction: string;
}> = ({ type, direction }) => {

    let legends = <>
        <div className="wrapper">
            <span className="icon icon--blip_new"></span>
            Update Versi
        </div>
        <div className="wrapper">
            <span className="icon icon--blip_changed"></span>
            Sedang Transisi
        </div>
        <div className="wrapper">
            <span className="icon icon--blip_default"></span>
            Tidak Berubah
        </div>
        <div className="wrapper">
            <span className="icon icon--blip_recomended"></span>
            Rekomendasi
        </div>
    </>

    if (type === "color") {
        const ringColors = ["#84BFA4", "#248EA6", "#F2A25C", "#F25244"].reverse()
        legends = <>
            <div className="wrapper">
                <span className="icon icon--color_ring" style={{ backgroundColor: ringColors[0] }}></span>
                Adopted - Hold
            </div>
            <div className="wrapper">
                <span className="icon icon--color_ring" style={{ backgroundColor: ringColors[1] }}></span>
                Trial - Explore
            </div>
            <div className="wrapper">
                <span className="icon icon--color_ring" style={{ backgroundColor: ringColors[2] }}></span>
                Adopted - Acceptable
            </div>
            <div className="wrapper">
                <span className="icon icon--color_ring" style={{ backgroundColor: ringColors[3] }}></span>
                Adopted - Recommended
            </div>
        </>
    }

    if (direction === "column")
        return (
            <div className={type ? "color-legend" : "radar-legend"}>
                {legends}
            </div>
        );

    return (
        <div className={type ? "color-legend" : "radar-legend"} style={{ display: "flex", position: "static", width: "100%", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {legends}
        </div>
    );
};