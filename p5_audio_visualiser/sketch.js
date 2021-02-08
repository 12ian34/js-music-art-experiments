let mic;
let fft;
let audioIn;

function gotSources(deviceList) {
    if (deviceList.length > 0) {
        audioIn.setSource(0);
        let currentSource = deviceList[audioIn.currentSource];
        text('set source to: ' + currentSource.deviceId, 5, 20, width);
    }
}

function setup() {

    text('getting sources...', 0, 20);
    audioIn = new p5.AudioIn();
    audioIn.getSources(gotSources);

    createCanvas(1920, 1080);

    // modular = new p5.AudioIn();
    // sources = modular.getSources();
    // source = modular.setSource(sources.length - 1);
    // mic = new p5.AudioIn();

    audioIn.start();

    fft = new p5.FFT(0.9, 256);
    fft.setInput(audioIn);
}

function draw() {
    background(0);
    fill(210);
    noStroke();
    let bins = fft.analyze();
    for (let i = 0; i < bins.length; i++) {
        let drawY = map(i, 0, bins.length, 0, height);
        let val = bins[i];
        let rectWidth = map(val, 0, 255, 0, width);
        let rectHeight = height / bins.length;
        rect(0, drawY, rectWidth, rectHeight);
    }
}