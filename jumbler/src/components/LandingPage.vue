<template>
    <div class="container" style="margin-top: 100px;">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md d-flex justify-content-center h-100">
            <button class="btn btn-primary h-100 w-50" @click="triggerFileUpload">Upload TXT File</button>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept=".txt" style="display: none;" />
          </div>
          <div class="col-md d-flex justify-content-center h-50">
            <button class="btn btn-primary h-100 w-50" @click="goToManual">Manual Entry</button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  
    methods: {
      goToManual() {
        this.$router.push("jumbler");
      },
  
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
  
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Process the file here
          console.log('File uploaded:', file.name);
        }
      }
    }
  }
  </script>
  
  <style scoped>
    button {
        height: 150px;
    }

    img {
        height: 300px;
        width: auto;
    }
  </style>
  