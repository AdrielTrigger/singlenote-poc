const information = document.getElementById('info');

const pingpong = async () => {
    const response = await window.versions.ping();
    console.log(response);
}

information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}) and Electron (v${window.versions.electron()}).`;

pingpong();