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
  public static getMediaDimensions(media: HTMLImageElement|HTMLVideoElement|ImageData): IDimensions {
    if (media instanceof HTMLImageElement) {
      return {
        width: media.naturalWidth,
        height: media.naturalHeight
      };
    } else if (media instanceof HTMLVideoElement) {
      return {
        width: media.videoWidth,
        height: media.videoHeight
      };
    } else {
      return {
        width: media.width,
        height: media.height
      };
    }
  }

  /**
   * Returns whether the media element has loaded the resource.
   * 
   * @param  {HTMLImageElement|HTMLVideoElement} media
   * @return {boolean}
   */
  public static isMediaLoaded(media: HTMLImageElement|HTMLVideoElement): boolean {
    if (!(media instanceof HTMLImageElement) && !(media instanceof HTMLVideoElement)) throw new Error('Invalid argument element');
    return media instanceof HTMLImageElement ? media.complete : media.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  }

  /**
   * Returns dimensions without borders and padding.
   *
   * @param  {HTMLImageElement|HTMLVideoElement} media
   * @return {{ width: number, height: number }}
   */
  public static getInnerDimensions(media: HTMLImageElement|HTMLVideoElement): IDimensions {
    const style = getComputedStyle(media);
    const width = media.clientWidth - ( parseFloat(style.getPropertyValue('padding-left')) + parseFloat(style.getPropertyValue('padding-right')));
    const height = media.clientHeight - ( parseFloat(style.getPropertyValue('padding-top')) + parseFloat(style.getPropertyValue('padding-bottom')));
    return { width, height }
  }

  /**
   * Wait for the media element to finish loading the resource.
   * 
   * @param  {HTMLImageElement|HTMLVideoElement} media
   * @return {Promise<Event>}
   */
  public static awaitMediaLoaded(media: HTMLImageElement|HTMLVideoElement): Promise<Event> {
    return new Promise((resolve, reject) => {
      media.addEventListener(media instanceof HTMLVideoElement ? 'loadedmetadata' : 'load', (event: Event) => resolve(event), { once: true });
      media.addEventListener('error', (event: Event) => reject(event), { once: true });
    })
  }

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
  public static getRotatedRectCoordinates(
    x: number,
    y: number,
    width: number,
    height: number,
    degree: number = 0
  ): ICoordinate[] {
    let topLeft;
    let topRight;
    let bottomRight;
    let bottomLeft;
    if (degree !== 0) {
      const x2 = x + width / 2;
      const y2 = y + height / 2;
      topLeft = this.getRotationCoordinate(x, y, x2, y2, degree);
      topRight = this.getRotationCoordinate(x + width, y, x2, y2, degree);
      bottomRight = this.getRotationCoordinate(x + width, y + height, x2, y2, degree);
      bottomLeft = this.getRotationCoordinate(x, y + height, x2, y2, degree);
    } else {
      topLeft = { x, y };
      topRight = { x: x + width, y };
      bottomRight = { x: x + width, y: y + height };
      bottomLeft = { x, y: y + height };
    }
    return [
      topLeft,
      topRight,
      bottomRight,
      bottomLeft
    ];
  }

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
  private static getRotationCoordinate(
    x: number,
    y: number,
    cx: number,
    cy: number,
    degree: number
  ): ICoordinate {
    const radian = degree * (Math.PI / 180);
    const sin = Math.sin(radian); 
    const cos = Math.cos(radian);
    return {
      x: cos * (x - cx) - sin * (y - cy) + cx,
      y: sin * (x - cx) + cos * (y - cy) + cy
    };
  }

  /**
   * Returns the center coordinate of multiple coordinates.
   * 
   * @param  {ICoordinate[]} coordinates
   * @return {ICoordinate} coordinate Center coordinates
   */
  public static getCenterCoordinate(...coordinates: ICoordinate[]): ICoordinate {
    const coordinate = coordinates.reduce((coordinate, { x, y }) => {
      coordinate.x += x;
      coordinate.y += y;
      return coordinate;
    }, {x: 0, y: 0});
    coordinate.x /= coordinates.length;
    coordinate.y /= coordinates.length;
    return coordinate;
  }

  /**
   * Returns the angle formed by the two coordinates.
   * 
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @return {number}
   */
  public static getAngleBetweenCoordinates(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    const radian = Math.atan2(y2 - y1, x2 - x1);
    const degree = radian * 180 / Math.PI;
    // const radian = Math.atan2(x2 - x1, y2 - y1);
    // let  degree = radian * 360 / (2 * Math.PI);
    // if (degree < 0) degree += 360;
    return degree;
  }

  /**
   * Returns the distance between two coordinates.
   * 
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @return {number}
   */
  public static getDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

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
  public static fitParent(
    media: HTMLImageElement|HTMLVideoElement,
    parent: HTMLElement,
    fit: 'contain'|'cover'
  ): void {
    const { width: actualWidth, height: actualHeight } = this.getMediaDimensions(media);
    const mediaStyle = getComputedStyle(media);
    const parentStyle = getComputedStyle(parent);
    const visibleWidth =
      parseFloat(parentStyle.getPropertyValue('width')) -
      parseFloat(parentStyle.getPropertyValue('padding-right')) -
      parseFloat(parentStyle.getPropertyValue('border-right-width')) -
      parseFloat(parentStyle.getPropertyValue('padding-left')) -
      parseFloat(parentStyle.getPropertyValue('border-left-width'));
    const visibleHeight =
      parseFloat(parentStyle.getPropertyValue('height')) -
      parseFloat(parentStyle.getPropertyValue('padding-top')) -
      parseFloat(parentStyle.getPropertyValue('border-top-width')) -
      parseFloat(parentStyle.getPropertyValue('padding-bottom')) -
      parseFloat(parentStyle.getPropertyValue('border-bottom-width'));
    const visibleY =
      parseFloat(parentStyle.getPropertyValue('padding-top')) +
      parseFloat(parentStyle.getPropertyValue('border-top-width')) +
      parseFloat(parentStyle.getPropertyValue('margin-top'));
    const visibleX =
      parseFloat(parentStyle.getPropertyValue('padding-left')) +
      parseFloat(parentStyle.getPropertyValue('border-left-width')) +
      parseFloat(parentStyle.getPropertyValue('margin-left'));
    const horizontalRatio = visibleWidth / actualWidth;
    const verticalRatio = visibleHeight / actualHeight;
    const ratio = fit === 'contain' ? Math.min(horizontalRatio, verticalRatio) : Math.max(horizontalRatio, verticalRatio);
    const cx = ( visibleWidth - actualWidth * ratio ) / 2;
    const cy = ( visibleHeight - actualHeight * ratio ) / 2;
    const x = visibleX + cx;
    const y = visibleY + cy;
    const width = actualWidth * ratio;
    const height = actualHeight * ratio;
    if (fit === 'cover') parent.style.overflow = 'hidden';
    if (parentStyle.getPropertyValue('position') === 'static') parent.style.position = 'relative';
    if (mediaStyle.getPropertyValue('position') !== 'absolute') media.style.position = 'absolute';
    media.style.left = `${x}px`;
    media.style.top = `${y}px`;
    media.style.width = `${width}px`;
    media.style.height = `${height}px`;
  }

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
  public static getRenderClientRect(media: HTMLImageElement|HTMLVideoElement): IRect {
    const fit = getComputedStyle(media).getPropertyValue('object-fit');
    const position = getComputedStyle(media).getPropertyValue('object-position').split(' ');
    const { width: actualWidth, height: actualHeight } = this.getMediaDimensions(media);
    const actualRatio = actualWidth / actualHeight;
    const visibleWidth = media.clientWidth;
    const visibleHeight = media.clientHeight;
    const visibleRatio = visibleWidth / visibleHeight;
    const horizontalRatio = parseInt(position[0]) / 100;
    const verticalRatio = parseInt(position[1]) / 100;
    let width = 0;
    let height = 0;
    let x = 0;
    let y = 0;
    const destination = { width: 1, height: 1, x: 0, y: 0};
    if (fit === 'none') {
      width = visibleWidth;
      height = visibleHeight;
      x = (actualWidth - visibleWidth) * horizontalRatio;
      y = (actualHeight - visibleHeight) * verticalRatio;
    } else if (fit === 'contain' || fit === 'scale-down') {
      // TODO: handle the 'scale-down' appropriately, once its meaning will be clear
      width = actualWidth;
      height = actualHeight;
      if (actualRatio > visibleRatio) {
        destination.height = (actualHeight / visibleHeight) / (actualWidth / visibleWidth);
        destination.y = (1 - destination.height) * verticalRatio;
      } else {
        destination.width = (actualWidth / visibleWidth) / (actualHeight / visibleHeight);
        destination.x = (1 - destination.width) * horizontalRatio;
      }
    } else if (fit === 'cover') {
      if (actualRatio > visibleRatio) {
        width = actualHeight * visibleRatio;
        height = actualHeight;
        x = (actualWidth - width) * horizontalRatio;
      } else {
        width = actualWidth;
        height = actualWidth / visibleRatio;
        y = (actualHeight - height) * verticalRatio;
      }
    } else if (fit === 'fill') {
      width = actualWidth;
      height = actualHeight;
    } else {
      console.error(`Unexpected object-fit attribute with value ${fit} relative to`);
    }
    return { x, y, width, height, destination };
  }

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
  public static drawPoint(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    option?: {
      radius?: number,
      color?: string
    }
  ): void {
    option = Object.assign({
      radius: 3,
      color: 'rgb(0,64,221)'
    }, option || {});
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.arc(x, y, option.radius!, 0, 2 * Math.PI);
    ctx.fillStyle = option.color!;
    ctx.fill();
  }

  /**
   * Draw a point at the center of multiple coordinates.
   * 
   * @param  {HTMLCanvasElement} canvas
   * @param  {ICoordinate[]} coordinates
   * @param  {number} options.radius
   * @param  {string} options.color
   * @return {void}
   */
  public static drawCenterPoint(
    canvas: HTMLCanvasElement,
    coordinates: ICoordinate[],
    option?: {
      radius?: number,
      color?: string
    }
  ): void {
    option = Object.assign({
      radius: 3,
      color: 'rgb(0,64,221)'
    }, option || {});
    const { x, y } = this.getCenterCoordinate(...coordinates);
    this.drawPoint(canvas, x, y, option);
  }

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
  public static drawRectangle(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    option?: {
      degree?: number,
      lineWidth?: number,
      lineColor?: string,
      shadowBlur?: number,
      shadowColor?: string,
      fill?: string
    }
  ): void {
    option = Object.assign({
      degree: 0,
      lineWidth: 2,
      lineColor: 'rgb(0,64,221)',
      shadowBlur: 0,
      shadowColor: 'rgb(0,64,221)',
      fill: undefined
    }, option || {});
    const corners = this.getRotatedRectCoordinates(x, y, width, height, option.degree);
    const ctx = canvas.getContext('2d')!;
    ctx.lineWidth = option.lineWidth!;
    ctx.strokeStyle = option.lineWidth ? option.lineColor! : 'transparent';
    if (option.shadowBlur) {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = option.shadowBlur;
      ctx.shadowColor = option.shadowColor!;
    }
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    ctx.lineTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[2].x, corners[2].y);
    ctx.lineTo(corners[3].x, corners[3].y);
    ctx.closePath();
    ctx.stroke();
    if (option.fill) {
      ctx.fillStyle = option.fill;
      ctx.fill();
    }
  }

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
  public static drawRectangleCorners(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    option?: {
      lineWidth?: number,
      lineColor?: string,
      shadowBlur?: number,
      shadowColor?: string
    }
  ): void {
    option = Object.assign({
      lineWidth: 2,
      lineColor: 'rgb(0,64,221)',
      shadowBlur: 0,
      shadowColor: 'rgb(0,64,221)'
    }, option || {});
    const ctx = canvas.getContext('2d')!;
    if (option.lineWidth) {
      ctx.strokeStyle = option.lineColor!;
      ctx.lineWidth = option.lineWidth;
    }
    if (option.shadowBlur) {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = option.shadowBlur;
      ctx.shadowColor = option.shadowColor!;
    }
    const corner = Math.min(width, height) / 4;
    ctx.beginPath();
    ctx.moveTo(x, y + corner);
    ctx.lineTo(x, y);
    ctx.lineTo(x + corner, y);
    ctx.moveTo(x + width - corner, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width , y + corner);
    ctx.moveTo(x, y + height - corner);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + corner, y + height);
    ctx.moveTo(x + width - corner, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width, y + height - corner);
    ctx.stroke();
  }

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
  public static drawText(
    canvas: HTMLCanvasElement,
    text: string,
    x: number,
    y: number,
    option?: {
      font?: string,
      color?: string,
      align?: CanvasTextAlign,
      baseline: CanvasTextBaseline
    }
  ): void {
    // @ts-ignore
    option = Object.assign({
      font: '14px arial,sans-serif',
      color: 'black',
      align: 'left',
      baseline: 'top'
    }, option || {}) as { font: string, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline };
    const ctx = canvas.getContext('2d')!;
    ctx.font = option.font!;
    ctx.fillStyle = option.color!;
    ctx.textAlign = option.align!;
    ctx.textBaseline = option.baseline!;
    ctx.fillText(text, x, y);
  }

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
  public static drawLine(
    canvas: HTMLCanvasElement,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    option?: {
      lineWidth?: number,
      color?: string
    }
  ): void {
    option = Object.assign({
      lineWidth: 1,
      color: 'rgb(0,64,221)'
    }, option || {});
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = option.color!;
    ctx.lineWidth = option.lineWidth!;
    ctx.stroke();
  }

  /**
   * Clear the drawing.
   * 
   * @return {void}
   */
  public static clearCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Flip the canvas drawing horizontally.
   * 
   * @param {HTMLCanvasElement} canvas
   * @return {void}
   */
  public static flipHorizontal(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    const height = imgData.height;
    const width = imgData.width;
    // Traverse every row and flip the pixels
    for (let i=0; i<height; i++) {
     // We only need to do half of every row since we're flipping the halves
      for (let j=0; j<width/2; j++) {
        const index = (i * 4) * width + (j * 4);
        const mirrorIndex = ((i + 1) * 4) * width - ((j + 1) * 4);
        for (let k=0; k<4; k++) {
          let tmp = imgData.data[index + k];
          imgData.data[index + k] = imgData.data[mirrorIndex + k];
          imgData.data[mirrorIndex + k] = tmp;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0, 0, 0, width, height);
  }


  /**
   * Load the image.
   * 
   * @param  {string} path
   * @return {HTMLImageElement}
   */
  public static async loadImage(path: string): Promise<HTMLImageElement> {
    const img  = new Image();
    img.setAttribute('src', path);
    await this.awaitMediaLoaded(img);
    return img;
  }

  /**
   * Crop in a circle.
   * 
   * @param {HTMLImageElement|string} media
   * @param  {number} options.x
   * @param  {number} options.y
   * @param  {number} options.size
   * @param  {string} options.format
   * @return {HTMLImageElement}
   */
  public static async cropCircle(
    media: HTMLImageElement|string,
    option?: {
      x?: number,
      y?: number,
      size?: number,
      format?: 'image/webp'|'image/png'|'image/jpeg' 
    }
  ): Promise<HTMLImageElement> {
    option = Object.assign({
      x: undefined,
      y: undefined,
      size: undefined,
      format: 'image/png'
    }, option || {});
    if (typeof media === 'string') media = await this.loadImage(media);
    if (!this.isMediaLoaded(media as HTMLImageElement)) await this.awaitMediaLoaded(media as HTMLImageElement);
    const { width, height } = this.getMediaDimensions(media);
    const size = Math.min(width, height);
    let x = option.x || 0;
    let y = option.y || 0;
    if (!option.x && width > height) x = width / 2 - height /2;
    if (!option.y && width < height) y = height / 2 - width /2;
    const canvas = document.createElement('canvas');
    canvas.width = option.size || size;
    canvas.height = option.size || size;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(media,
      x, y, size, size,
      0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
    const img = new Image();
    img.src = canvas.toDataURL(option.format, 1);
    return img;
  }
}