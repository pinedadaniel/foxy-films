function getBase64(src, callback) {
          let file = src;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              console.log(reader.result);
              callback(reader.result);
          }
}

export {getBase64}