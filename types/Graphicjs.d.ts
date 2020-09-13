import ICoordinate from '~/interfaces/ICoordinate';
import IRect from '~/interfaces/IRect';
import IDimensions from '~/interfaces/IDimensions';
export default class {
    /**
     * Returns the dimensions (width and height) of a media element.
     *
     * @param  {HTMLImageElement|HTMLVideoElement|ImageData} media
     * @return {{ width: number, height: number }}
     */
    static getMediaDimensions(media: HTMLImageElement | HTMLVideoElement | ImageData): IDimensions;
    /**
     * Returns whether the media element has loaded the resource.
     *
     * @param  {HTMLImageElement|HTMLVideoElement} media
     * @return {boolean}
     */
    static isMediaLoaded(media: HTMLImageElement | HTMLVideoElement): boolean;
    /**
     * Returns dimensions without borders and padding.
     *
     * @param  {HTMLImageElement|HTMLVideoElement} media
     * @return {{ width: number, height: number }}
     */
    static getInnerDimensions(media: HTMLImageElement | HTMLVideoElement): IDimensions;
    /**
     * Wait for the media element to finish loading the resource.
     *
     * @param  {HTMLImageElement|HTMLVideoElement} media
     * @return {Promise<Event>}
     */
    static awaitMediaLoaded(media: HTMLImageElement | HTMLVideoElement): Promise<Event>;
    /**
     * Returns the coordinates of the corners of a rotated rectangle.
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} degree
     * @return {ICoordinate[]}
     */
    static getRotatedRectCoordinates(x: number, y: number, width: number, height: number, degree?: number): ICoordinate[];
    /**
     * Returns rotated coordinates
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} cx
     * @param  {number} cy
     * @param  {number} degree
     * @return {ICoordinate} coordinate Coordinate after rotation
     */
    private static getRotationCoordinate;
    /**
     * Returns the center coordinate of multiple coordinates.
     *
     * @param  {ICoordinate[]} coordinates
     * @return {ICoordinate} coordinate Center coordinates
     */
    static getCenterCoordinate(...coordinates: ICoordinate[]): ICoordinate;
    /**
     * Returns the angle formed by the two coordinates.
     *
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @return {number}
     */
    static getAngleBetweenCoordinates(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Returns the distance between two coordinates.
     *
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @return {number}
     */
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Fits the media element to the parent element according to the fit type of the media element.
     * If the fit is "contain", it will be expanded to fit the parent while maintaining the aspect ratio of the media.
     * If the fit is "cover", it will be enlarged while maintaining the aspect ratio of the media, and the part that protrudes from the parent will be trimmed.
     *
     * @param  {HTMLImageElement|HTMLVideoElement} media
     * @param  {HTMLElement} parent
     * @param  {'contain'|'cover'} fit
     * @return {void}
     */
    static fitParent(media: HTMLImageElement | HTMLVideoElement, parent: HTMLElement, fit: 'contain' | 'cover'): void;
    /**
     * Returns the dimension where the actual dimensions of the media element fit in the visible range.
     *
     * @param  {HTMLImageElement|HTMLVideoElement} media
     * @return {IRect} rect Display size and position of media element
     *          x                 : The horizontal position of the left-top point where the sourceFrame should be cut,
     *          y                 : The vertical position of the left-top point where the sourceFrame should be cut,
     *          width             : How much horizontal space of the sourceFrame should be cut,
     *          height            : How much vertical space of the sourceFrame should be cut,
     *          destination.x     : The percentage of the horizontal position of the left-top point on the printFrame where the image will be printed, relative to the printFrame width,
     *          destination.y     : The percentage of the vertical position of the left-top point on the printFrame where the image will be printed, relative to the printFrame height,
     *          destination.width : The percentage of the printFrame width on which the image will be printed, relative to the printFrame width,
     *          destination.height: The percentage of the printFrame height on which the image will be printed, relative to the printFrame height.
     */
    static getRenderClientRect(media: HTMLImageElement | HTMLVideoElement): IRect;
    /**
     * Draw points at coordinates.
     *
     * @param  {HTMLCanvasElement} canvas
     * @param  {number} x
     * @param  {number} y
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {void}
     */
    static drawPoint(canvas: HTMLCanvasElement, x: number, y: number, option?: {
        radius?: number;
        color?: string;
    }): void;
    /**
     * Draw a point at the center of multiple coordinates.
     *
     * @param  {HTMLCanvasElement} canvas
     * @param  {ICoordinate[]} coordinates
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {void}
     */
    static drawCenterPoint(canvas: HTMLCanvasElement, coordinates: ICoordinate[], option?: {
        radius?: number;
        color?: string;
    }): void;
    /**
     * Draw rectangle.
     *
     * @param  {HTMLCanvasElement} canvas
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} options.degree
     * @param  {number} options.lineWidth
     * @param  {string} options.lineColor
     * @param  {number} options.shadowBlur
     * @param  {string} options.shadowColor
     * @return {void}
     */
    static drawRectangle(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, option?: {
        degree?: number;
        lineWidth?: number;
        lineColor?: string;
        shadowBlur?: number;
        shadowColor?: string;
        fill?: string;
    }): void;
    /**
     * Draw rectangle corners.
     *
     * @param  {HTMLCanvasElement} canvas
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} options.lineWidth
     * @param  {string} options.lineColor
     * @param  {number} options.shadowBlur
     * @param  {string} options.shadowColor
     * @return {void}
     */
    static drawRectangleCorners(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, option?: {
        lineWidth?: number;
        lineColor?: string;
        shadowBlur?: number;
        shadowColor?: string;
    }): void;
    /**
     * Draw a string on the canvas.
     *
     * @param {HTMLCanvasElement} canvas
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param  {string} options.font
     * @param  {string} options.color
     * @param  {string} options.align
     * @param  {string} options.baseline
     * @return {void}
     */
    static drawText(canvas: HTMLCanvasElement, text: string, x: number, y: number, option?: {
        font?: string;
        color?: string;
        align?: CanvasTextAlign;
        baseline: CanvasTextBaseline;
    }): void;
    /**
     * Draw a line on the canvas.
     *
     * @param  {HTMLCanvasElement} canvas
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} options.lineWidth
     * @param  {string} options.color
     * @return {void}
     */
    static drawLine(canvas: HTMLCanvasElement, x1: number, y1: number, x2: number, y2: number, option?: {
        lineWidth?: number;
        color?: string;
    }): void;
    /**
     * Clear the drawing.
     *
     * @return {void}
     */
    static clearCanvas(canvas: HTMLCanvasElement): void;
    /**
     * Flip the canvas drawing horizontally.
     *
     * @param {HTMLCanvasElement} canvas
     * @return {void}
     */
    static flipHorizontal(canvas: HTMLCanvasElement): void;
}
