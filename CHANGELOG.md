# Changelog

## [1.0.1] - 2020-09-21

Added a method to crop the image in a circle.  

![drawLine.png](https://raw.githubusercontent.com/takuya-motoshima/graphicjs/master/screencap/cropCircle.png)

```js
<canvas id="canvas"></canvas>

import graphicjs from 'graphicjs';

// Crop the image in a circle
const croppedImg = await graphicjs.cropCircle('sample.jpg', { size: 240 });
const canvas = document.querySelector('#canvas');
canvas.width = croppedImg.width;
canvas.height = croppedImg.height;
canvas.getContext('2d').drawImage(croppedImg, 0, 0);
```

## [1.0.0] - 2020-09-09

Released.