$(document).ready(function(){
  $('.info-circle').tooltip();
});

// collapse//
const minimizeBtns = document.querySelectorAll('.minimize-btn');

minimizeBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const icon = this.querySelector('.icon');
    const isCollapsed = this.getAttribute('aria-expanded') === 'false';

    if (isCollapsed) {
      icon.textContent = '+';
    } else {
      icon.textContent = '-';
    }
  });
});


function updateHashGenerator() {
  const packageSelect = document.getElementById("packageSelect");
  const quantityInput = document.getElementById("quantityInput");

  const selectedOption = packageSelect.options[packageSelect.selectedIndex];

  quantityInput.value = selectedOption.getAttribute("package-quantity");
}
function updateAsicModel () {
  const asicSelect = document.getElementById("asicSelect");
  const asicQuantitySelect = document.getElementById("miner-hashrate");
  const selectedAsicOption = asicSelect.options[asicSelect.selectedIndex];
  asicQuantitySelect.value =((selectedAsicOption.getAttribute("asic-hashrate") / currentHashrate) * currentBitcoinPrice * minedBitcoins).toFixed(2);

  const asicHashrateSelected = selectedAsicOption.getAttribute("asic-hashrate");
  document.getElementById("asicHashrate").value = asicHashrateSelected;
}

  
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function calculate() {
  //Daily Asic Revenue USD/day//
  // const TotalNetworkHashrate = parseFloat(document.getElementById("total-network-hashrate").value);
  // const GrossNetworkRevenue = parseFloat(document.getElementById("gross-network-revenue").value);
  const AsicHashrate = parseFloat(document.getElementById("asicHashrate").value);

  const totalAsicRevenue = (AsicHashrate / 436874767.59) * 28808503.87;

  document.getElementById("totalAsicRevenue").value = totalAsicRevenue.toFixed(2)


  //total KW & Estimated Fuel Gas (MCF/day)//
  const asicPower = parseFloat(document.getElementById("asicPowerInput").value);
  const quantity = parseFloat(document.getElementById("quantityInput").value);

  if (!isNaN(asicPower) && !isNaN(quantity)) {
      const totalLoadcenter = asicPower * quantity;

      document.getElementById("totalCost").value = totalLoadcenter.toFixed(2);

      const estimatedFuelGas = (totalLoadcenter * 24) / 79.2;

      document.getElementById("totalRevenue").value = estimatedFuelGas.toFixed(2);
  }
  
  //Project Capital Expenses-Per Equipment Packages//
    const gensetUnit = parseFloat(document.getElementById("genset-unit").value) || 0;
    const loadcenterUnit = parseFloat(document.getElementById("loadcenter-unit").value) || 0;
    const asicUnit = parseFloat(document.getElementById("asic-unit").value) || 0;
    const installationUnit = parseFloat(document.getElementById("installation-unit").value) || 0;
    const totalEquipment = parseFloat(document.getElementById("total-equipment").value) || 0;
    const flareCombustorUnit = parseFloat(document.getElementById("flare-combustor-unit").value) || 0;

    const gensetTotal = gensetUnit * totalEquipment;
    const loadcenterTotal = loadcenterUnit * totalEquipment;
    const asicTotal = asicUnit * totalEquipment * quantity;
    const installationTotal = installationUnit * totalEquipment;
    const totalcostequipment = gensetTotal + loadcenterTotal + asicTotal + installationTotal;
    const flareCombustorTotal = flareCombustorUnit

    document.getElementById("genset-total").value = gensetTotal.toFixed(2);
    document.getElementById("loadcenter-total").value = loadcenterTotal.toFixed(2);
    document.getElementById("asic-total").value = asicTotal.toFixed(2);
    document.getElementById("installation-total").value = installationTotal.toFixed(2);
    document.getElementById("total-cost-equipment").textContent = formatCurrency(totalcostequipment);
    document.getElementById("flare-combustor-total").value = flareCombustorTotal.toFixed(2);
}

function RevenueBitcoinMining() {
  const quantity = parseFloat(document.getElementById("quantityInput").value);
  const totalAsicRevenue = parseFloat(document.getElementById("totalAsicRevenue").value);
  const totalEquipment = parseFloat(document.getElementById("total-equipment").value);

  const carbonEmission = parseFloat(document.getElementById("carbon-emession-benefit").value)
  const increMental = parseFloat(document.getElementById("incremental-oil").value)
  const otherIncome =  parseFloat(document.getElementById("other-income").value)
  const incrementalNetback =  parseFloat(document.getElementById("incremental-oil-netback").value)
  const uptimePercentage = parseFloat(document.getElementById("uptime-revenue").value);

  const gensetMaintenance = parseFloat(document.getElementById("genset-unit-month").value);
  const cellularData = parseFloat(document.getElementById("cellular-data").value);
  const energyCost = parseFloat(document.getElementById("natural-gas-cost").value);

  const asicReplacementCost = parseFloat(document.getElementById("asic-replacement").value);
  const gensetReplacementCost = parseFloat(document.getElementById("genset-replacement").value);
  const loadcenterReplacementCost = parseFloat(document.getElementById("loadcenter-replacement").value);
  const asicTotal = parseFloat(document.getElementById("asic-total").value);
  const gensetTotal = parseFloat(document.getElementById("genset-total").value);
  const loadcenterTotal = parseFloat(document.getElementById("loadcenter-total").value);
  const installationTotal = parseFloat(document.getElementById("installation-total").value);
  const flareCombustorTotal = parseFloat(document.getElementById("flare-combustor-total").value);
  const salvageValuePercentage = parseFloat(document.getElementById("salvage-value-package").value);



  // if (!isNaN(quantity) && !isNaN(totalAsicRevenue) && !isNaN(totalEquipment)) {
    const mbitcoinPotential = quantity * totalAsicRevenue * 30.4 * totalEquipment;
    const ybitcoinPotential = mbitcoinPotential * 12 ;

    const bitcoinRealMonth = mbitcoinPotential * (uptimePercentage / 100);
    const bitcoinRealYear = ybitcoinPotential * (uptimePercentage / 100);


    // Update the table header with the calculated value
    document.getElementById("mbitcoin-potential").textContent = formatCurrency(mbitcoinPotential.toFixed(2));
    document.getElementById("ybitcoin-potential").textContent = formatCurrency(ybitcoinPotential.toFixed(2));  
    document.getElementById("mbitcoin-real").textContent = formatCurrency(bitcoinRealMonth.toFixed(2));  
    document.getElementById("ybitcoin-real").textContent = formatCurrency(bitcoinRealYear.toFixed(2));  

  // }
  const carbonEmissionMonth = carbonEmission * 30.4 * (uptimePercentage / 100);
  const carbonEmissionYear = carbonEmissionMonth *12;
  document.getElementById("m-carbon-credits").textContent = formatCurrency(carbonEmissionMonth.toFixed(2)); 
  document.getElementById("y-carbon-credits").textContent = formatCurrency(carbonEmissionYear.toFixed(2)); 

  const IncrementalOilProductionMonth = increMental * incrementalNetback * 30.4 * (uptimePercentage / 100);
  const IncrementalOilProductionYear = IncrementalOilProductionMonth * 12
  document.getElementById("m-incremental-oil").textContent = formatCurrency(IncrementalOilProductionMonth.toFixed(2)); 
  document.getElementById("y-incremental-oil").textContent = formatCurrency(IncrementalOilProductionYear.toFixed(2)); 

  const otherIncomeMonth = otherIncome * 30.4;
  const otherIncomeYear = otherIncomeMonth * 12;
  document.getElementById("m-other-income").textContent = formatCurrency(otherIncomeMonth.toFixed(2)); 
  document.getElementById("y-other-income").textContent = formatCurrency(otherIncomeYear.toFixed(2)); 

  const gensetMaintenanceMonth = - (totalEquipment * gensetMaintenance);
  const gensetMaintenanceYear = gensetMaintenanceMonth * 12;
  document.getElementById("m-genset-oilchange").textContent = formatCurrency(gensetMaintenanceMonth.toFixed(2)); 
  document.getElementById("y-genset-oilchange").textContent = formatCurrency(gensetMaintenanceYear.toFixed(2)); 


  const cellularDataMonth = - (totalEquipment * cellularData);
  const cellularDataYear = cellularDataMonth * 12;
  document.getElementById("m-cellular-data").textContent = formatCurrency(cellularDataMonth.toFixed(2));
  document.getElementById("y-cellular-data").textContent = formatCurrency(cellularDataYear.toFixed(2));

  const energyCostMonth = -(totalEquipment * energyCost);
  const energyCostYear = energyCostMonth * 12;
  document.getElementById("m-energy-cost").textContent = formatCurrency(energyCostMonth.toFixed(2));
  document.getElementById("y-energy-cost").textContent = formatCurrency(energyCostYear.toFixed(2));
  

  const asicReplacementCostMonth = -(asicTotal/asicReplacementCost );
  const asicReplacementCostYear = asicReplacementCostMonth * 12;
  document.getElementById("m-asic-replacement").textContent = formatCurrency(asicReplacementCostMonth.toFixed(2));
  document.getElementById("y-asic-replacement").textContent = formatCurrency(asicReplacementCostYear.toFixed(2));

  const gensetReplacementCostMonth = -(gensetTotal /gensetReplacementCost );
  const gensetReplacementCostYear = gensetReplacementCostMonth * 12;
  document.getElementById("m-genset-replacement").textContent = formatCurrency(gensetReplacementCostMonth.toFixed(2));
  document.getElementById("y-genset-replacement").textContent = formatCurrency(gensetReplacementCostYear.toFixed(2));

  const loadcenterReplacementCostMonth = -(loadcenterTotal / loadcenterReplacementCost );
  const loadcenterReplacementCostYear = loadcenterReplacementCostMonth * 12;
  document.getElementById("m-loadcenter-replacement").textContent = formatCurrency(loadcenterReplacementCostMonth.toFixed(2));
  document.getElementById("y-loadcenter-replacement").textContent = formatCurrency(loadcenterReplacementCostYear.toFixed(2));


  //Oil Producer (customer) Unit economics:
  const capitalCostMonth = -(asicTotal + gensetTotal + loadcenterTotal + installationTotal);
  const capitalCostYear = -(asicTotal + gensetTotal + loadcenterTotal + installationTotal);
  document.getElementById("m-capital-cost").textContent = formatCurrency(capitalCostMonth.toFixed(2));
  document.getElementById("y-capital-cost").textContent = formatCurrency(capitalCostYear.toFixed(2));
  document.getElementById("m-capital-cost-incremental").textContent = formatCurrency((capitalCostMonth + flareCombustorTotal).toFixed(2));
  document.getElementById("y-capital-cost-incremental").textContent = formatCurrency((capitalCostMonth + flareCombustorTotal).toFixed(2));

  const salvageValuePackageMonth = (salvageValuePercentage/100) * (asicTotal + gensetTotal + loadcenterTotal);
  document.getElementById("m-salavge-value-package").textContent = formatCurrency(salvageValuePackageMonth.toFixed(2)); 
  document.getElementById("y-salavge-value-package").textContent = formatCurrency(salvageValuePackageMonth.toFixed(2));

  const grossRevenueMonth = bitcoinRealMonth +  carbonEmission + increMental + otherIncome;
  const grossRevenueYear = bitcoinRealYear +  carbonEmission + increMental + otherIncome;
  document.getElementById("m-gross-revenue").textContent = formatCurrency(grossRevenueMonth.toFixed(2));
  document.getElementById("y-gross-revenue").textContent = formatCurrency(grossRevenueYear.toFixed(2));

  
  const operatingExpensesMonth = gensetMaintenanceMonth + cellularDataMonth + energyCostMonth;
  const operatingExpensesYear = gensetMaintenanceYear + cellularDataYear + energyCostYear;
  document.getElementById("m-operating-expenses").textContent = formatCurrency(operatingExpensesMonth.toFixed(2));
  document.getElementById("y-operating-expenses").textContent = formatCurrency(operatingExpensesYear.toFixed(2));

  const operatingExpensesNoncashMonth =  asicReplacementCostMonth + gensetReplacementCostMonth + loadcenterReplacementCostMonth;
  const operatingExpensesNoncashYear = asicReplacementCostYear + gensetReplacementCostYear + loadcenterReplacementCostYear;
  document.getElementById("m-operating-expenses-noncash").textContent = formatCurrency(operatingExpensesNoncashMonth.toFixed(2));
  document.getElementById("y-operating-expenses-noncash").textContent = formatCurrency(operatingExpensesNoncashYear.toFixed(2));

  const netCashflowMonth = grossRevenueMonth + operatingExpensesMonth;
  const netCashflowYear = grossRevenueYear + operatingExpensesYear;
  document.getElementById("m-net-cashflow").textContent = formatCurrency(netCashflowMonth.toFixed(2));
  document.getElementById("y-net-cashflow").textContent = formatCurrency(netCashflowYear.toFixed(2));

 const cashPaybackMonth = -( capitalCostMonth + salvageValuePackageMonth ) / netCashflowMonth;
 const cashPaybackYear = -( capitalCostYear + salvageValuePackageMonth ) / netCashflowYear;
 document.getElementById("m-cashpayback").textContent = (cashPaybackMonth.toFixed(2));
 document.getElementById("y-cashpayback").textContent = (cashPaybackYear.toFixed(2));

 const operatingIncomeMonth = (grossRevenueMonth + operatingExpensesMonth + operatingExpensesNoncashMonth);
 const operatingIncomeYear = (grossRevenueYear + operatingExpensesYear + operatingExpensesNoncashYear);
 document.getElementById("m-operating-income").textContent = formatCurrency(operatingIncomeMonth.toFixed(2));
 document.getElementById("y-operating-income").textContent = formatCurrency(operatingIncomeYear.toFixed(2));

 const payBackPeriodUnitMonth = -(capitalCostMonth + salvageValuePackageMonth) / operatingIncomeMonth;
 const payBackPeriodUnitYear = -(capitalCostYear + salvageValuePackageMonth) / operatingIncomeYear;
 document.getElementById("m-payback-period-unit").textContent = (payBackPeriodUnitMonth.toFixed(2));
 document.getElementById("y-payback-period-unit").textContent = (payBackPeriodUnitYear.toFixed(2));

 const ROIUnitMonth =  operatingIncomeMonth / (-(capitalCostMonth) - (salvageValuePackageMonth)) * 100
 const ROIUnitYear =  operatingIncomeYear / (-(capitalCostYear) - (salvageValuePackageMonth)) * 100
 document.getElementById("m-ROI-unit").textContent = (ROIUnitMonth.toFixed(2));
 document.getElementById("y-ROI-unit").textContent = (ROIUnitYear.toFixed(2));

 const capitalCostIncrementalMonth = capitalCostMonth +flareCombustorTotal
 const capitalCostIncrementalYear = capitalCostMonth +flareCombustorTotal

 const payBackPeriodMonth = -(capitalCostIncrementalMonth + salvageValuePackageMonth) / operatingIncomeMonth;
 const payBackPeriodYear = -(capitalCostIncrementalYear + salvageValuePackageMonth) / operatingIncomeYear;
 document.getElementById("m-payback-period").textContent = (payBackPeriodMonth.toFixed(2));
 document.getElementById("y-payback-period").textContent = (payBackPeriodYear.toFixed(2));
 
 const ROIMonth =  operatingIncomeMonth / (-(capitalCostIncrementalMonth) - (salvageValuePackageMonth)) * 100
 const ROIYear =  operatingIncomeYear / (-(capitalCostIncrementalYear) - (salvageValuePackageMonth)) * 100
 document.getElementById("m-ROI").textContent = (ROIMonth.toFixed(2));
 document.getElementById("y-ROI").textContent = (ROIYear.toFixed(2));
}

function scrollToTableTop() {
  const tableTop = document.getElementById("mbitcoin-potential").offsetTop;
  window.scrollTo({ top: tableTop, behavior: 'smooth' });
}



document.querySelector('.btn-primary').addEventListener('click', function() {
  RevenueBitcoinMining() ;
  scrollToTableTop(); 
});

//Project Capital expenses- Per equipment packages//
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("genset-unit").value = 45000;
  document.getElementById("loadcenter-unit").value = 14500;
  document.getElementById("asic-unit").value = 1150;
  document.getElementById("installation-unit").value = 3500;
  document.getElementById("genset-total").value = 0;
  document.getElementById("loadcenter-total").value = 0;
  document.getElementById("asic-total").value = 0;
  document.getElementById("installation-total").value = 0;
  document.getElementById("flare-combustor-unit").value = 0;
  document.getElementById("flare-combustor-total").value = 0;

  document.getElementById("incremental-oil").value = 0;
  document.getElementById("incremental-oil-netback").value = 0;
  document.getElementById("carbon-emession-benefit").value = 0;
  document.getElementById("other-income").value = 0;

  document.getElementById("genset-unit-month").value =400 ; 
  document.getElementById("cellular-data").value =125 ;
  document.getElementById("natural-gas-cost").value =0 ;

  document.getElementById("asic-replacement").value = 60;
  document.getElementById("genset-replacement").value = 120;
  document.getElementById("loadcenter-replacement").value = 240;
  
});


let relevantAveragePrices;
let totalAverageHashrate;
let currentHashrate;
let currentBitcoinPrice;
let minedBitcoins;
const apibtcprice = 'https://cors-anywhere.herokuapp.com/https://insights.braiins.com/api/v1.0/hashrate-and-difficulty-history?timeframe=2w';
fetch(apibtcprice)
  .then(response => response.text())
  .then(data => {
    const jsonData = JSON.parse(data);

    if (jsonData.price && jsonData.hashrate && jsonData.hashrate.global && Array.isArray(jsonData.price) && Array.isArray(jsonData.hashrate.global)) {
      const pricesByDate = new Map();
      jsonData.price.forEach(entry => {
        const date = new Date(entry.x).toLocaleDateString();
        const price = parseFloat(entry.y);

        if (pricesByDate.has(date)) {
          pricesByDate.get(date).push(price);
        } else {
          pricesByDate.set(date, [price]);
        }
      });

      const averagePrices = [];
      pricesByDate.forEach((prices, date) => {
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        averagePrices.push({
          date: new Date(date),
          averagePrice: averagePrice.toFixed(2),
        });
      });

      averagePrices.sort((a, b) => a.date - b.date);

      const fourteenDayAgo = new Date();
      fourteenDayAgo.setDate(fourteenDayAgo.getDate() - 14);

      relevantAveragePrices = averagePrices.filter(entry => entry.date >= fourteenDayAgo);
      fetchDataForNetworkRevenue();
      const totalAveragePrice = relevantAveragePrices.reduce((sum, entry) => sum + parseFloat(entry.averagePrice), 0) / relevantAveragePrices.length;

      const hashratesByDate = new Map();
      jsonData.hashrate.global.forEach(entry => {
        const date = new Date(entry.x).toLocaleDateString();
        const hashrate = parseFloat(entry.y);

        if (hashratesByDate.has(date)) {
          hashratesByDate.get(date).push(hashrate);
        } else {
          hashratesByDate.set(date, [hashrate]);
        }
      });

      const averageHashrates = [];
      hashratesByDate.forEach((hashrates, date) => {
        const averageHashrate = hashrates.reduce((sum, hashrate) => sum + hashrate, 0) / hashrates.length;
        averageHashrates.push({
          date: new Date(date),
          averageHashrate: averageHashrate.toFixed(2),
        });
      });

      averageHashrates.sort((a, b) => a.date - b.date);
      const relevantAverageHashrates = averageHashrates.filter(entry => entry.date >= fourteenDayAgo);
      totalAverageHashrate = relevantAverageHashrates.reduce((sum, entry) => sum + parseFloat(entry.averageHashrate), 0) / relevantAverageHashrates.length;
      const btcPriceElement = document.getElementById("btc-price");
      const btcPricePlaceholder = document.getElementById("btc-price-placeholder");
      btcPricePlaceholder.style.display = 'none'; 
      btcPriceElement.textContent = formatCurrency(totalAveragePrice.toFixed(2)) + ' USD';

      const btcHashrateElement = document.getElementById("btc-hashrate");
      const btcHashratePlaceholder = document.getElementById("btc-hashrate-placeholder");
      btcHashratePlaceholder.style.display = 'none'; 
      btcHashrateElement.textContent = textContent = totalAverageHashrate.toFixed(2) + " EH/s";

      //currenthashrate
      const latestHashrateEntry = jsonData.hashrate.global[jsonData.hashrate.global.length - 1];
      currentHashrate = parseFloat(latestHashrateEntry.y) * 1000000;
      // currentbtcprice
      const latestPriceEntry = jsonData.price[jsonData.price.length - 1];
      currentBitcoinPrice = parseFloat(latestPriceEntry.y);

    } else {
      console.error('Unexpected or undefined data structure:', jsonData);
    }
  })
.catch(error => console.error('Error fetching data from the API:', error));

function fetchDataForNetworkRevenue() {
  const apiRevenue = 'https://cors-anywhere.herokuapp.com/https://insights.braiins.com/api/v1.0/daily-revenue-history?timeframe=2w';
  fetch(apiRevenue)
    .then(response => response.text())
    .then(data => {
      const jsonData = JSON.parse(data);

      if (jsonData.miners_revenue_usd && Array.isArray(jsonData.miners_revenue_usd)) {
        const networkRevenueByDate = new Map();
        jsonData.miners_revenue_usd.forEach(entry => {
          const date = new Date(entry.x).toLocaleDateString();
          const miners_revenue_usd = parseFloat(entry.y);

          if (networkRevenueByDate.has(date)) {
            networkRevenueByDate.get(date).push(miners_revenue_usd);
          } else {
            networkRevenueByDate.set(date, [miners_revenue_usd]);
          }
        });

        const averageNetworkRevenues = [];
        networkRevenueByDate.forEach((revenues, date) => {
          const averageNetworkRevenue = revenues.reduce((sum, miners_revenue_usd) => sum + miners_revenue_usd, 0) / revenues.length;
          averageNetworkRevenues.push({
            date: new Date(date),
            averageNetworkRevenue: averageNetworkRevenue.toFixed(2),
          });
        });

        averageNetworkRevenues.sort((a, b) => a.date - b.date);

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        const relevantAverageNetworkRevenue = averageNetworkRevenues.filter(entry => entry.date >= fourteenDaysAgo);

        const totalNetworkRevenue = relevantAverageNetworkRevenue.reduce((sum, entry) => sum + parseFloat(entry.averageNetworkRevenue), 0);
        const averageNetworkRevenue = totalNetworkRevenue / relevantAverageNetworkRevenue.length;

        const grossRevenueElement = document.getElementById("gross-network-revenue");
        const btcRevenuePlaceholder = document.getElementById("btc-revenue-placeholder");
        btcRevenuePlaceholder.style.display = 'none'; 
        grossRevenueElement.textContent = formatCurrency(averageNetworkRevenue.toFixed(2)) + " USD";
        
        HashpriceUsdDay =  averageNetworkRevenue / (totalAverageHashrate * 1000000)
        document.getElementById("reference-hashprice").value = HashpriceUsdDay.toFixed(5);

        if (relevantAveragePrices && Array.isArray(relevantAveragePrices)) {
          const minedBitcoinsData = [];
          relevantAveragePrices.forEach((priceEntry) => {
            const matchingRevenueEntry = relevantAverageNetworkRevenue.find(
              (revenueEntry) => revenueEntry.date.getTime() === priceEntry.date.getTime()
            );

            if (matchingRevenueEntry) {
              const minedBitcoins = parseFloat(matchingRevenueEntry.averageNetworkRevenue) / parseFloat(priceEntry.averagePrice);
              minedBitcoinsData.push({
                date: priceEntry.date,
                minedBitcoins: minedBitcoins.toFixed(8),
              });
            }
          });

          const totalMinedBitcoins = minedBitcoinsData.reduce((sum, entry) => sum + parseFloat(entry.minedBitcoins), 0);
          const averageMinedBitcoins = totalMinedBitcoins / minedBitcoinsData.length;

          const dailyMinedBtcElement = document.getElementById("daily-mined-bitcoins");
          const btcDailyMinedPlaceholder = document.getElementById("btc-mined-placeholder");
          btcDailyMinedPlaceholder.style.display = 'none'; 
          dailyMinedBtcElement.textContent = averageMinedBitcoins.toFixed(2);
        } else {
          console.error('relevantAveragePrices is not defined or is not an array');
        }

        const latestPriceEntry = relevantAveragePrices[relevantAveragePrices.length - 1];
        const latestRevenueEntry = relevantAverageNetworkRevenue[relevantAverageNetworkRevenue.length - 1];
        minedBitcoins = parseFloat(latestRevenueEntry.averageNetworkRevenue) / parseFloat(latestPriceEntry.averagePrice);
        
      } else {
        console.error('Unexpected or undefined data structure:', jsonData);
      }
    })
    .catch(error => console.error('Error fetching network revenue data from the API:', error));
}


function validateForm() {
  let isValid = true;

  const requiredFields = ["packageSelect", "quantityInput", "asicSelect", "asicPowerInput","asicHashrate","asic-Cost", "uptime-revenue", "total-equipment", "salvage-value-package"];

  requiredFields.forEach(fieldId => {
    const inputField = document.getElementById(fieldId);

    if (inputField.tagName === 'SELECT' && inputField.selectedIndex === 0) {
      inputField.classList.add("error-border");
      isValid = false;
    } else if (inputField.tagName !== 'SELECT' && !inputField.value.trim()) {
      inputField.classList.add("error-border");
      isValid = false;
    } else {
      inputField.classList.remove("error-border");
    }
  });

  return isValid;
}


document.querySelector('.btn-primary').addEventListener('click', function() {
  if (validateForm()) {
    RevenueBitcoinMining();
    scrollToTableTop();
  } else {
    alert('Please fill in all the required fields.');
  }
});


let isPdf1 = true;

document.getElementById('download-pdf').addEventListener('click', function () {
  const elementId = isPdf1 ? 'pdf-download-1' : 'pdf-download-2';
  generatePDF(elementId);
  isPdf1 = !isPdf1; 
});

function generatePDF(elementId) {
  const element = document.getElementById(elementId); 
  
  element.style.width = '800px';
  
  html2pdf(element);
}