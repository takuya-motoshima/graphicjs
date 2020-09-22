# Graphic JS class

## Methods

### getMediaDimensions()
Returns the dimensions (width and height) of a media element.

###### Syntax
```js
graphicjs.getMediaDimensions(media: HTMLImageElement|HTMLVideoElement|ImageData): IDimensions
```

###### Parameters
- __media__: HTMLImageElement|HTMLVideoElement|ImageData  
    Media element.

###### Return
Returns the width and height objects ({ width: number, height: number }) of the media element.

### isMediaLoaded()  
Returns whether the media element has loaded the resource.

###### Syntax
```js
graphicjs.isMediaLoaded(media: HTMLImageElement|HTMLVideoElement): boolean
```

###### Parameters
- __media__: HTMLImageElement|HTMLVideoElement  
    Media element.

###### Return
Returns TRUE if the resource has been loaded, FALSE if it has not.

### getInnerDimensions()  
Returns dimensions without borders and padding.

###### Syntax
```js
graphicjs.getInnerDimensions(media: HTMLImageElement|HTMLVideoElement): IDimensions
```

###### Parameters
- __media__: HTMLImageElement|HTMLVideoElement  
    Media element.

###### Return
Returns an object with width and height excluding the padding and border of the media element ({width: number, height: number}).

### awaitMediaLoaded()  
Wait for the media element to finish loading the resource.

###### Syntax
```js
graphicjs.awaitMediaLoaded(media: HTMLImageElement|HTMLVideoElement): Promise<Event>
```

###### Parameters
- __media__: HTMLImageElement|HTMLVideoElement  
    Media element.

###### Return
Returns a promise that accepts a load event object.

### getRotatedRectCoordinates()  
Returns the coordinates of the corners of a rotated rectangle.

###### Syntax
```js
graphicjs.getRotatedRectCoordinates(
  x: number,
  y: number,
  width: number,
  height: number,
  degree: number = 0
): ICoordinate[]
```

###### Parameters
- __x__: number  
    X coordinate of rectangle.

- __y__: number  
    Y coordinate of rectangle.

- __width__: number  
    The width of the rectangle.

- __height__: number  
    The height of the rectangle.

- __degree__: number  
    The angle of the rotating rectangle. The unit is degrees.

###### Return
Returns the coordinates of the corners of the rotated rectangle as an object ({ topLeft: number, topRight: number, bottomRight: number, bottomLeft: number }).

### getRotationCoordinate()  
Returns rotated coordinates.

###### Syntax
```js
graphicjs.getRotationCoordinate(
  x: number,
  y: number,
  cx: number,
  cy: number,
  degree: number = 0
): ICoordinate
```

###### Parameters
- __x__: number  
    X coordinate of the rotating point.

- __y__: number  
    Y coordinate of the rotating point.

- __cx__: number  
    X coordinate of origin of rotation.

- __cy__: number  
    Y coordinate of origin of rotation.

- __degree__: number  
    The angle to rotate. The unit is degrees.

###### Return
Returns the rotated coordinates as an object ({ x: number, y: number }).

### getCenterCoordinate()  
Returns the center coordinate of multiple coordinates.

###### Syntax
```js
graphicjs.getCenterCoordinate(...coordinates: ICoordinate[]): ICoordinate
```

###### Parameters
- __coordinates__: ICoordinate[]  
    Pass two or more coordinate objects ({ x: number, y: number }) in succession.

###### Return
Returns the central coordinate object ({ x: number, y: number }).

### getAngleBetweenCoordinates()  
Returns the angle formed by the two coordinates.

###### Syntax
```js
graphicjs.getAngleBetweenCoordinates(x1: number, y1: number, x2: number, y2: number): number
```

###### Parameters
- __x1__: number  
    X coordinate of the first point.

- __y1__: number  
    Y coordinate of the first point.

- __x2__: number  
    X coordinate of the second point.

- __y2__: number  
    Y coordinate of the second point.

###### Return
Returns the angle formed by the two coordinates.

### getDistance()  
Returns the distance between two coordinates.

###### Syntax
```js
graphicjs.getDistance(x1: number, y1: number, x2: number, y2: number): number
```

###### Parameters
- __x1__: number  
    X coordinate of the first point.

- __y1__: number  
    Y coordinate of the first point.

- __x2__: number  
    X coordinate of the second point.

- __y2__: number  
    Y coordinate of the second point.

###### Return
Returns the distance between two coordinates.

### fitParent()  
Fits the media element to the parent element according to the fit type of the media element.  

###### Syntax
```js
graphicjs.fitParent(
  media: HTMLImageElement|HTMLVideoElement,
  parent: HTMLElement,
  fit: 'contain'|'cover'
): void
```

###### Parameters
- __media__: number  
    Media element.

- __parent__: HTMLElement  
    Parent element of media element.

- __fit__: 'contain'|'cover'  
    How to fit media elements.  
    If the fit is "contain", it will be expanded to fit the parent while maintaining the aspect ratio of the media.  
    If the fit is "cover", it will be enlarged while maintaining the aspect ratio of the media, and the part that protrudes from the parent will be trimmed.

### getRenderClientRect()  
Returns the dimension where the actual dimensions of the media element fit in the visible range.

###### Syntax
```js
graphicjs.getRenderClientRect(media: HTMLImageElement|HTMLVideoElement): IRect
```

###### Parameters
- __media__: number  
    Media element.

###### Return
Returns the dimension object of the media element that fits the visible range ({ x: number, y: number, width: number, height: number }).

### drawPoint()  
Draw points at coordinates.

###### Syntax
```js
graphicjs.drawPoint(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  option?: { radius?: number, color?: string }
): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to draw.

- __x__: number  
    X coordinate of point.

- __y__: number  
    Y coordinate of point.

- __option__: { radius?: number, color?: string }
    Drawing options  
    <table>
        <tr>
            <td>radius</td>
            <td>The radius of the point. The default is 3.</td>
        </tr>
        <tr>
            <td>color</td>
            <td>The color of the point. The default is rgb(0,64,221).</td>
        </tr>
    </table>

### drawCenterPoint()  
Draw a point at the center of multiple coordinates.

###### Syntax
```js
graphicjs.drawCenterPoint(
  canvas: HTMLCanvasElement,
  coordinates: ICoordinate[],
  option?: { radius?: number, color?: string }
): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to draw.

- __coordinates__: ICoordinate[]  
    An array of coordinate objects ({ x: number, y: number }[]).

- __option__: { radius?: number, color?: string }
    Drawing options  
    <table>
        <tr>
            <td>radius</td>
            <td>The radius of the point. The default is 3.</td>
        </tr>
        <tr>
            <td>color</td>
            <td>The color of the point. The default is rgb(0,64,221).</td>
        </tr>
    </table>

### drawRectangle()  
Draw rectangle.

###### Syntax
```js
graphicjs.drawRectangle(
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
): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to draw.

- __x__: number  
    X coordinate of rectangle.

- __y__: number  
    Y coordinate of rectangle.

- __width__: number  
    The width of the rectangle..

- __height__: number  
    The height of the rectangle.

- __option__: { degree?: number, lineWidth?: number, lineColor?: string, shadowBlur?: number, shadowColor?: string, fill?: string }
    Drawing options  
    <table>
        <tr>
            <td>degree</td>
            <td>The rotation angle of the rectangle. The unit is degrees. The default is no rotation (0 degree).</td>
        </tr>
        <tr>
            <td>lineWidth</td>
            <td>The width of the rectangular line. The default is 2.</td>
        </tr>
        <tr>
            <td>lineColor</td>
            <td>The color of the rectangular line. The default is rgb(0,64,221).</td>
        </tr>
        <tr>
            <td>shadowBlur</td>
            <td>The width of the rectangular shadow. The default is no shadow (0).</td>
        </tr>
        <tr>
            <td>shadowColor</td>
            <td>The color of the shadow on the rectangle. The default is rgb(0,64,221).</td>
        </tr>
        <tr>
            <td>fill</td>
            <td>The rectangle fill color. The default is no color.</td>
        </tr>
    </table>

### drawRectangleCorners()  
Draw rectangle corners.

###### Syntax
```js
graphicjs.drawRectangleCorners(
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
): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to draw.

- __x__: number  
    X coordinate of rectangle.

- __y__: number  
    Y coordinate of rectangle.

- __width__: number  
    The width of the rectangle..

- __height__: number  
    The height of the rectangle.

- __option__: { lineWidth?: number, lineColor?: string, shadowBlur?: number, shadowColor?: string }
    Drawing options  
    <table>
        <tr>
            <td>lineWidth</td>
            <td>The width of the rectangular line. The default is 2.</td>
        </tr>
        <tr>
            <td>lineColor</td>
            <td>The color of the rectangular line. The default is rgb(0,64,221).</td>
        </tr>
        <tr>
            <td>shadowBlur</td>
            <td>The width of the rectangular shadow. The default is no shadow (0).</td>
        </tr>
        <tr>
            <td>shadowColor</td>
            <td>The color of the shadow on the rectangle. The default is rgb(0,64,221).</td>
        </tr>
    </table>

### drawText()  
Draw a string on the canvas.

###### Syntax
```js
drawText(
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
): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to draw.

- __text__: string  
    Text to draw.

- __x__: number  
    The X coordinate at which to draw the text.

- __y__: number  
    The Y coordinate at which to draw the text.

- __option__: { font?: string, color?: string, align?: CanvasTextAlign, baseline: CanvasTextBaseline }
    Drawing options  
    <table>
        <tr>
            <td>font</td>
            <td>Font family and size. The default is "14px arial, sans-serif".</td>
        </tr>
        <tr>
            <td>color</td>
            <td>Text color. The default is "black".</td>
        </tr>
        <tr>
            <td>align</td>
            <td>Horizontal position of the text. The default is "left".</td>
        </tr>
        <tr>
            <td>baseline</td>
            <td>The vertical position of the text. The default is "top"./td>
        </tr>
    </table>

### clearCanvas()  
Clear the drawing.

###### Syntax
```js
graphicjs.clearCanvas(canvas: HTMLCanvasElement): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    Canvas element to clear the drawing.

### flipHorizontal()  
Flip the canvas drawing horizontally.

###### Syntax
```js
graphicjs.flipHorizontal(canvas: HTMLCanvasElement): void
```

###### Parameters
- __canvas__: HTMLCanvasElement  
    The canvas element to flip.

### cropCircle()  
Crop in a circle.

###### Syntax
```js
async graphicjs.cropCircle(
  media: HTMLImageElement|string,
  option?: {
    x?: number,
    y?: number,
    size?: number,
    format?: 'image/webp'|'image/png'|'image/jpeg'
  }
): Promise<HTMLImageElement>
```

###### Parameters
- __media__: HTMLImageElement|string  
    Image element or image URL to crop in a circle.

- __option__: { x?: number, y?: number, size?: number, format?: 'image/webp'|'image/png'|'image/jpeg' }
   Crop options  
    <table>
        <tr>
            <td>x</td>
            <td>The X coordinate of the center of the circle. The default is the center of the image.</td>
        </tr>
        <tr>
            <td>y</td>
            <td>The Y coordinate of the center of the circle. The default is the center of the image.</td>
        </tr>
        <tr>
            <td>size</td>
            <td>The diameter of the circle. The default uses the optimal diameter to fit the original image.</td>
        </tr>
        <tr>
            <td>format</td>
            <td>The format of the cropped image. The default is "image/png".</td>
        </tr>
    </table>

###### Return
Returns an image element cropped in a circle.

### getTextDimensions()  
Returns the dimensions of the text.

###### Syntax
```js
graphicjs.getTextDimensions(text: string, font?: string): IDimensions
```

###### Parameters
- __text__: string  
    String to get the dimensions.

- __font__: string  
    String font size and font family.For example, '14px Arial'.

###### Return
Returns a string height and width object({width: number, height: number}).
