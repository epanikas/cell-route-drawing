import {CSSProperties} from "react";
import {CanvasPosition} from "./canvas-position";

export class CssPropertiesUtils {

    public static absolutePositioning(p1: CanvasPosition, p2: CanvasPosition): CSSProperties {

        const topLeft: CanvasPosition = CanvasPosition.topLeft(p1, p2);

        const res: CSSProperties = {} as CSSProperties;

        res.position = "absolute";
        res.top = topLeft.y;
        res.left = topLeft.x;
        res.width = Math.abs(p1.x - p2.x);
        res.height = Math.abs(p1.y - p2.y);

        return res;
    }

    public static mergeCssProperties(style1: CSSProperties, style2: CSSProperties): CSSProperties {

        const res = CssPropertiesUtils.cloneCssProperties(style1);

        for (const key in style2) {
            let str: keyof CSSProperties = key as keyof CSSProperties;
            // @ts-ignore
            res[str] = style2[str];
        }

        return res;
    }

    public static cloneCssProperties(style1: CSSProperties): CSSProperties {
        const res: CSSProperties = {} as CSSProperties;
        for (const key in style1) {
            let str: keyof CSSProperties = key as keyof CSSProperties;
            // @ts-ignore
            res[str] = style1[str];
        }

        return res;

    }

}