const widthDevider = 3.2;
const heightDevider = 2.4;

const alphaChart = document.getElementById("alpha_chart");
// alphaChart.setAttribute("height", window.screen.height / heightDevider);
alphaChart.setAttribute("width", window.screen.width / widthDevider);

const betaChart = document.getElementById("beta_chart");
betaChart.setAttribute("width", window.screen.width / widthDevider);

const gammaChart = document.getElementById("gamma_chart");
gammaChart.setAttribute("width", window.screen.width / widthDevider);

const thetaChart = document.getElementById("theta_chart");
thetaChart.setAttribute("width", window.screen.width / widthDevider);

const deltaChart = document.getElementById("delta_chart");
deltaChart.setAttribute("width", window.screen.width / widthDevider);