export const calculatePositionRotate = (
  xPost: number,
  yPost: number,
  width: number,
  height: number,
  rotation: number
) => {
  let returnValue = {
    x: xPost,
    y: yPost,
  };
  let sudut = 90 - rotation;
  let lenghtX = hitungAlas(rotation, width);
  let cutX = hitungAlas(sudut, height);

  returnValue.x = xPost + lenghtX - cutX;

  let lenghtY = hitungTinggi(rotation, width);
  let addY = hitungTinggi(sudut, height);
  returnValue.y = yPost + lenghtY + addY;
  return returnValue;
};

function hitungAlas(sudut: number, r: number) {
  // Mengonversi sudut dari derajat ke radian
  var sudutRadian = sudut * (Math.PI / 180);
  // Menghitung panjang alas menggunakan trigonometri cos
  return r * Math.cos(sudutRadian);
}

// Fungsi untuk menghitung tinggi (t) dari segitiga siku-siku
function hitungTinggi(sudut: number, r: number) {
  // Mengonversi sudut dari derajat ke radian
  var sudutRadian = sudut * (Math.PI / 180);
  // Menghitung tinggi menggunakan trigonometri sin
  return r * Math.sin(sudutRadian);
}

export const calculatePositionRotateText = (
  xPost: number,
  yPost: number,
  width: number,
  height: number,
  rotation: number,
  scaleX: number,
  scaleY: number
) => {
  let returnValue = {
    x: 0,
    y: 0,
  };

  let angle = rotation % 360;

  if (angle < 0) {
    // Jika sudut negatif, normalisasi ke rentang positif
    angle = 360 + angle;
  }

  let angledDegy = angle;
  if (angledDegy > 180) {
    let diffAngle = angledDegy - 180;
    angledDegy = 180 - diffAngle;
  }

  returnValue.y = -((angledDegy / 180) * 40);

  let angleDegx = angle;
  let xAxis = 0;
  if (angleDegx > 90 && angleDegx <= 180) {
    let diffAngle = angleDegx - 90;
    angleDegx = 90 - diffAngle;
    xAxis = (angleDegx / 90) * 90;
  }
  if (angleDegx > 180 && angleDegx <= 270) {
    let diffAngle = angleDegx - 180;
    angleDegx = 180 - angleDegx;
    xAxis = -((angleDegx / 90) * 90);
  }

  if (angleDegx > 270 && angleDegx <= 360) {
    let diffAngle = angleDegx - 270;
    angleDegx = 90 - diffAngle;
    xAxis = -((angleDegx / 90) * 90);
  } else {
    xAxis = (angleDegx / 90) * 90;
  }

  returnValue.x = 0;

  return returnValue;
};
