export const template = (color: string, uuid: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg viewBox="25 25 50 50" width="50" height="50" class="root" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!--uuid=${uuid}-->
    <circle cx="50" cy="50" r="20" class="circle"></circle>

    <style>
    .root {
      width: 3.75em;
      transform-origin: center;
      animation: rotate 2s linear infinite;
    }

    .circle {
      fill: none;
      stroke: ${color};
      stroke-width: 5;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dashoffset: -125px;
      }
    }
    </style>
  </svg>`
}
