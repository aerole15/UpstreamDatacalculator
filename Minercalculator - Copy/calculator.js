
document.addEventListener('DOMContentLoaded', function () {
  const minimizeBtns = document.querySelectorAll('.minimize-btn-card');

  minimizeBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const icon = event.currentTarget.querySelector('.icon');
      const isCollapsed = event.currentTarget.getAttribute('aria-expanded') === 'false';

      if (isCollapsed) {
        icon.textContent = '+';
      } else {
        icon.textContent = '-';
      }
    });
  });
});     

$(document).ready(function(){
  $('.info-circle').tooltip();
});

function printPage() {
  window.print();
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatAmount(value) {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const options = formatter.resolvedOptions();
  
  // Remove the currency symbol
  options.style = 'decimal';
  options.currency = undefined;

  const currencyFormatter = new Intl.NumberFormat('en-US', options);
  
  return currencyFormatter.format(value);
}

function calculate() {
  const gensetUnit = parseFloat(document.getElementById("genset-unit").value) || 0;
  const loadcenterUnit = parseFloat(document.getElementById("loadcenter-unit").value) || 0;
  const asicUnit = parseFloat(document.getElementById("asic-unit").value) || 0;
  const installationUnit = parseFloat(document.getElementById("installation-unit").value) || 0;
  const totalEquipment = parseFloat(document.getElementById("total-equipment").value) || 0;
  // const flareCombustorUnit = parseFloat(document.getElementById("flare-combustor-unit").value) || 0;
  const asicCost = parseFloat(document.getElementById("asic-cost").value) || 0;
  const poolFeePercentage = parseFloat(document.getElementById("pool-fee-input").value) || 0;
  const uptimeinput = parseFloat(document.getElementById("uptime-input").value) || 0;
  const asicReferenceHashprice = parseFloat(document.getElementById("reference-hashprice").value) || 0;
  const electricityPrice = parseFloat(document.getElementById("electricity").value) || 0;
  const gasPrice = parseFloat(document.getElementById("gas").value) || 0;

  const selectElement = document.getElementById("asicSelect");
  const selectedAsicOption = selectElement.options[selectElement.selectedIndex];

  if (selectedAsicOption) {
    const asicHashrateSelected = selectedAsicOption.getAttribute("asic-hashrate");
    const asicPowerSelected = selectedAsicOption.getAttribute("asic-power");

    if (asicHashrateSelected !== null && asicHashrateSelected !== undefined) {
        document.getElementById("asicHashrate").value = asicHashrateSelected;
        document.getElementById("asicPowerInput").value = asicPowerSelected;
        AsicHashrate = parseFloat(document.getElementById("asicHashrate").value);
        totalAsicRevenue = (AsicHashrate / (totalAverageHashrate * 1000000)) * averageNetworkRevenue;
        document.getElementById("totalAsicRevenue").value = totalAsicRevenue.toFixed(2);
    }
  }

  //total KW & Estimated Fuel Gas (MCF/day)//
  const asicPower = parseFloat(document.getElementById("asicPowerInput").value);
  const quantity = parseFloat(document.getElementById("quantityInput").value);


  const totalLoadcenter = asicPower * quantity;
  const estimatedFuelGas = (totalLoadcenter * 24) / 79.2;
  const asiCostTotal = asicCost * quantity
  const gensetTotal = gensetUnit * totalEquipment;
  const loadcenterTotal = loadcenterUnit * totalEquipment;
  const asicTotal = asicUnit * totalEquipment * quantity;
  const installationTotal = installationUnit * totalEquipment;
  const totalcostequipment = gensetTotal + loadcenterTotal + asicTotal + installationTotal;
  // const flareCombustorTotal = flareCombustorUnit
  const DailyGrossRevenue = (uptimeinput/100) * (quantity * totalAsicRevenue);
  const poolFee = DailyGrossRevenue * (poolFeePercentage / 100 );
  const electricityPriceTotal = electricityPrice * 24 * quantity * asicPower;
  const gasPriceTotal = gasPrice;
  const dailyExpense = electricityPriceTotal + gasPriceTotal + poolFee;


  document.getElementById("totalRevenue").value = estimatedFuelGas.toFixed(2);
  document.getElementById("totalCost").value = totalLoadcenter.toFixed(2);
  document.getElementById("total-kw-available").value = (availableKW - totalLoadcenter).toFixed(2);
  document.getElementById("electricity-cost").textContent = formatCurrency(electricityPriceTotal);
  document.getElementById("gas-cost").textContent = formatCurrency(gasPriceTotal);
  document.getElementById("asic-reference-hashprice").textContent = asicReferenceHashprice;
  document.getElementById("genset-total").value = gensetTotal;
  document.getElementById("loadcenter-total").value = loadcenterTotal;
  document.getElementById("asic-total").value = asicTotal;
  document.getElementById("installation-total").value = installationTotal;
  document.getElementById("total-cost-equipment").textContent = formatCurrency(totalcostequipment);
  // document.getElementById("flare-combustor-total").value = flareCombustorTotal.toFixed(2);

  // document.getElementById("average-profit-month").textContent = formatCurrency((AverageProfitDay * 30.4).toFixed(2));
  document.getElementById("asic-quantity-details").textContent = quantity;
  document.getElementById("asic-cost-details").textContent = formatCurrency(asiCostTotal.toFixed(2));
  document.getElementById("asic-kw-details").textContent = totalLoadcenter.toFixed(2);
  document.getElementById("asic-fuel-details").textContent = estimatedFuelGas.toFixed(2);
  document.getElementById("asic-pool-fee").textContent = formatCurrency(poolFee.toFixed(2));


  //Expected Profit Table
  document.getElementById("income-daily").textContent = formatCurrency(DailyGrossRevenue.toFixed(2));
  document.getElementById("income-monthly").textContent = formatCurrency((DailyGrossRevenue * 30.4).toFixed(2));
  document.getElementById("income-yearly").textContent = formatCurrency((DailyGrossRevenue * 30.4 *12).toFixed(2));

  document.getElementById("electricity-total-daily").textContent = (asicPower.toFixed(2) + " KWH/KWH");
  document.getElementById("electricity-total-monthly").textContent = ((asicPower * 30.4).toFixed(2) + " KWH");
  document.getElementById("electricity-total-yearly").textContent = ((asicPower * 30.4 *12).toFixed(2) + " KWH");

  document.getElementById("electricity-cost-daily").textContent = formatCurrency(electricityPriceTotal.toFixed(2));
  document.getElementById("electricity-cost-monthly").textContent = formatCurrency((electricityPriceTotal * 30.4).toFixed(2));
  document.getElementById("electricity-cost-yearly").textContent = formatCurrency((electricityPriceTotal * 30.4 *12).toFixed(2));

  document.getElementById("profit-daily").textContent = formatCurrency((DailyGrossRevenue - electricityPriceTotal).toFixed(2));
  document.getElementById("profit-monthly").textContent = formatCurrency(((DailyGrossRevenue - electricityPriceTotal) * 30.4).toFixed(2));
  document.getElementById("profit-yearly").textContent = formatCurrency(((DailyGrossRevenue - electricityPriceTotal) * 30.4 * 12).toFixed(2))


  // document.getElementById("daily-gross-revenue").textContent = formatCurrency(DailyGrossRevenue.toFixed(2));
  // document.getElementById("daily-expenses").textContent = formatCurrency(- dailyExpense.toFixed(2));
  // document.getElementById("daily-profit").textContent = formatCurrency((DailyGrossRevenue - dailyExpense).toFixed(2));



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
  const poolFeeOperatingExpense = parseFloat(document.getElementById("pool-fee-operating-expense").value);
  const asicReplacementCost = parseFloat(document.getElementById("asic-replacement").value);
  const gensetReplacementCost = parseFloat(document.getElementById("genset-replacement").value);
  const loadcenterReplacementCost = parseFloat(document.getElementById("loadcenter-replacement").value);
  const asicTotal = parseFloat(document.getElementById("asic-total").value);
  const gensetTotal = parseFloat(document.getElementById("genset-total").value);
  const loadcenterTotal = parseFloat(document.getElementById("loadcenter-total").value);
  const installationTotal = parseFloat(document.getElementById("installation-total").value);
  // const flareCombustorTotal = parseFloat(document.getElementById("flare-combustor-total").value);
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
  
  //pool Fee
  const poolFeeCalculatedMonth = -(poolFeeOperatingExpense/100 * bitcoinRealMonth)
  const poolFeeCalculatedYear = -(poolFeeOperatingExpense/100 * bitcoinRealYear)

  document.getElementById("m-pool-fee").textContent = formatCurrency(poolFeeCalculatedMonth.toFixed(2));
  document.getElementById("y-pool-fee").textContent = formatCurrency(poolFeeCalculatedYear.toFixed(2));

  // 
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
  // document.getElementById("m-capital-cost-incremental").textContent = formatCurrency((capitalCostMonth + flareCombustorTotal).toFixed(2));
  // document.getElementById("y-capital-cost-incremental").textContent = formatCurrency((capitalCostMonth + flareCombustorTotal).toFixed(2));

  const salvageValuePackageMonth = (salvageValuePercentage/100) * (asicTotal + gensetTotal + loadcenterTotal);
  document.getElementById("m-salavge-value-package").textContent = formatCurrency(salvageValuePackageMonth.toFixed(2)); 
  document.getElementById("y-salavge-value-package").textContent = formatCurrency(salvageValuePackageMonth.toFixed(2));

  const grossRevenueMonth = bitcoinRealMonth +  carbonEmissionMonth + IncrementalOilProductionMonth + otherIncomeMonth;
  const grossRevenueYear = bitcoinRealYear +  carbonEmissionYear + IncrementalOilProductionYear + otherIncomeYear;
  document.getElementById("m-gross-revenue").textContent = formatCurrency(grossRevenueMonth.toFixed(2));
  document.getElementById("y-gross-revenue").textContent = formatCurrency(grossRevenueYear.toFixed(2));

  
  const operatingExpensesMonth = gensetMaintenanceMonth + cellularDataMonth + energyCostMonth + poolFeeCalculatedMonth;
  const operatingExpensesYear = gensetMaintenanceYear + cellularDataYear + energyCostYear + poolFeeCalculatedYear
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
  document.getElementById("m-ROI-unit").textContent = (ROIUnitMonth.toFixed(2) + "%");
  document.getElementById("y-ROI-unit").textContent = (ROIUnitYear.toFixed(2) + "%");

  //  const capitalCostIncrementalMonth = capitalCostMonth +flareCombustorTotal
  //  const capitalCostIncrementalYear = capitalCostMonth +flareCombustorTotal

  //  const payBackPeriodMonth = -(capitalCostIncrementalMonth + salvageValuePackageMonth) / operatingIncomeMonth;
  //  const payBackPeriodYear = -(capitalCostIncrementalYear + salvageValuePackageMonth) / operatingIncomeYear;
  //  document.getElementById("m-payback-period").textContent = (payBackPeriodMonth.toFixed(2));
  //  document.getElementById("y-payback-period").textContent = (payBackPeriodYear.toFixed(2));
    
  //  const ROIMonth =  operatingIncomeMonth / (-(capitalCostIncrementalMonth) - (salvageValuePackageMonth)) * 100
  //  const ROIYear =  operatingIncomeYear / (-(capitalCostIncrementalYear) - (salvageValuePackageMonth)) * 100
  //  document.getElementById("m-ROI").textContent = (ROIMonth.toFixed(2));
  //  document.getElementById("y-ROI").textContent = (ROIYear.toFixed(2));
}

function scrollToTableTop() {
  const tableTop = document.getElementById("mbitcoin-potential").offsetTop;
  window.scrollTo({ top: tableTop, behavior: 'smooth' });
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

document.querySelector('.total-calculate').addEventListener('click', function() {
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
  // document.getElementById("flare-combustor-unit").value = 0;
  // document.getElementById("flare-combustor-total").value = 0;
  document.getElementById("quantityInput").value = 1;
  document.getElementById("uptime-input").value = 100;
  document.getElementById("uptime-revenue").value = 100;
  document.getElementById("pool-fee-input").value = 2
  document.getElementById("pool-fee-operating-expense").value = 2

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
  document.getElementById("salvage-value-package").value = 50;
  document.getElementById("gas").value = 0;
  document.getElementById("electricity").value = 0;

});

let relevantAveragePrices;
let totalAverageHashrate;
let currentHashrate;
let currentBitcoinPrice;
let minedBitcoins;
let averageNetworkRevenue;
const apibtcprice = 'https://corsproxy.io/api?url=https://insights.braiins.com/api/v1.0/hashrate-and-difficulty-history?timeframe=2w';
const apiRevenue = 'https://corsproxy.io/api?url=https://insights.braiins.com/api/v1.0/daily-revenue-history?timeframe=2w';
const apigaspriceCAD = "https://api.economicdata.alberta.ca/api/data?code=1d7cea03-8cd1-497f-8f62-bc62de9a1b7a";
const apigaspriceUSD = "https://markets.tradingeconomics.com/chart/ng1:com?span=1d&securify=new&url=/commodity/natural-gas&AUTH=GSlStHFFFH%2FSDJWYeMp9eG4C7QKDTd%2Fftca0QTCEUF2P0nf3F9%2B7dU1ldO2WgkiI&ohlc=0";

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
      console.log(currentHashrate)
      // currentbtcprice
      const latestPriceEntry = jsonData.price[jsonData.price.length - 1];
      currentBitcoinPrice = parseFloat(latestPriceEntry.y);

    } else {
      console.error('Unexpected or undefined data structure:', jsonData);
    }
  })
.catch(error => console.error('Error fetching data from the API:', error));

function fetchDataForNetworkRevenue() {
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
        averageNetworkRevenue = totalNetworkRevenue / relevantAverageNetworkRevenue.length;

        const grossRevenueElement = document.getElementById("gross-network-revenue");
        const btcRevenuePlaceholder = document.getElementById("btc-revenue-placeholder");
        btcRevenuePlaceholder.style.display = 'none'; 
        grossRevenueElement.textContent = formatCurrency(averageNetworkRevenue.toFixed(2)) + " USD";
        
        HashpriceUsdDay =  averageNetworkRevenue / (totalAverageHashrate * 1000000)
        document.getElementById("reference-hashprice").value = HashpriceUsdDay.toFixed(5);
        document.getElementById("asic-reference-hashprice").textContent = "$" + HashpriceUsdDay.toFixed(5);
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

document.querySelector('.btn-primary').addEventListener('click', function() {
  if (validateForm()) {
    RevenueBitcoinMining();
    scrollToTableTop();
  } else {
    alert('Please fill in all the required fields.');
  }
});

const asicmodelapi = "https://corsproxy.io/api?url=https://api2.nicehash.com/main/api/v2/public/profcalc/devices";
async function main() {
    try {
        const response = await fetch(asicmodelapi);
        const json_data = await response.json();
        const asicModels = parseData(json_data);
        populateDropdown(asicModels);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

function parseData(json_data) {
  const deviceData = json_data.devices;
  const asicDevices = deviceData.filter(d => d.category.toUpperCase() === "ASIC");
  const btcAsics = asicDevices.filter(validateBtcAsic);
  const result = {};

  for (const asic of btcAsics) {
      const speeds = JSON.parse(asic.speeds);
      const hashrate = parseFloat(speeds.SHA256ASICBOOST);

      if (hashrate > 0) {
          // console.log(`ASIC Model: ${asic.name.trim()}, SHA256ASICBOOST: ${hashrate}`);
          result[asic.name.trim()] = {
              power: asic.power,
              hashrate: hashrate,
          };
      }
  }
  const sortedResult = Object.keys(result).sort();
  return result;
}

function validateBtcAsic(asicData) {
    const parsedAlgoSpeeds = JSON.parse(asicData.speeds);
    const algos = Object.keys(parsedAlgoSpeeds);

    if (algos.includes("SHA256ASICBOOST")) {
        return parsedAlgoSpeeds.SHA256ASICBOOST !== 0;
    }

    return false;
}

function populateDropdown(asicModels) {
  const selectElement = document.getElementById("asicSelect");

  for (const model in asicModels) {
      if (asicModels.hasOwnProperty(model)) {
          const optionElement = document.createElement("option");
          optionElement.value = model;
          optionElement.textContent = model;
          const hashrate = asicModels[model].hashrate;

          const power = asicModels[model].power;
          optionElement.setAttribute("asic-hashrate", hashrate);
          optionElement.setAttribute("asic-power", power / 1000);
          selectElement.appendChild(optionElement);
      }
  }
  const otherOption = document.createElement("option");
  otherOption.value = "Other";
  otherOption.textContent = "Other";
  selectElement.appendChild(otherOption);
}

main();

$(document).ready(function () {
  function toggleSections() {
      $(".advanced-section").toggle();
      var calculationContent = $("#calculation .advanced-section").detach();
      var revenueContent = $("#revenue .advanced-section").detach();

      $("#revenue").append(calculationContent);
      $("#calculation").append(revenueContent);
  }

  toggleSections();

  $('.toggle').click(function(e){
    e.preventDefault(); 
    toggleSections();
    $(this).toggleClass('toggle-on');
  });
});

var $ = jQuery;

$(document).ready(function () {

    var h = [];

    $('.sliding-text').each(function () {
        h.push($(this).find('.sliding-effects-start-burning').clone().html());
    });
    function init() {
      $('.sliding-text').each(function (i) {
        var $this = $(this);

        $this.find('.sliding-effects-start-burning').removeClass('sliding');

        var amount = 4; 

        var textString = Array(amount).fill(h[i]).join(' '.repeat(amount - 1));

        $this.find('.sliding-effects-start-burning').empty().addClass('sliding');
        $this.find('.sliding-effects-start-burning').html(textString);
      });
    }

    init();
    $(window).on('load resize', function () {
        init();
    });
});

function toggleInputs() {
  const powerSelect = document.getElementById("powerSelect");
  const electricityInput = document.getElementById("electricityInput");
  const gasInput = document.getElementById("gasInput");
  const electricityRow = document.getElementById("electricity-cost-row");
  const gasRow = document.getElementById("gas-cost-row");
  const eletriciyTotal = document.getElementById("electricity-total");
  const electricityCost = document.getElementById("electricity-cost-total");
  const gasTotal = document.getElementById("gas-total");
  const gasCost = document.getElementById("gas-cost-total");

  if (powerSelect.value == "1") {
    electricityInput.style.display = "block";
    gasInput.style.display = "none";
    electricityRow.style.display = "table-row";
    eletriciyTotal.style.display = "table-row";
    electricityCost.style.display = "table-row";
    gasRow.style.display = "none";
    gasTotal.style.display = "none";
    gasCost.style.display = "none";
    gasInput.value = "";
  } else if (powerSelect.value == "2") {
    electricityInput.style.display = "none";
    gasInput.style.display = "block";
    electricityRow.style.display = "none";
    eletriciyTotal.style.display = "none";
    electricityCost.style.display = "none";
    gasRow.style.display = "table-row";
    gasTotal.style.display = "table-row";
    gasCost.style.display = "table-row";
    electricityInput.value = "";
  } else {
    electricityInput.style.display = "none";
    gasInput.style.display = "none";
    electricityRow.style.display = "none";
    gasRow.style.display = "none";
    eletriciyTotal.style.display = "none";
    electricityCost.style.display = "none";
    gasTotal.style.display = "none";
    gasCost.style.display = "none";
    electricityInput.value = "";
    gasInput.value = "";
  }

  if (powerSelect.value !== sessionStorage.getItem("lastSelection")) {
    sessionStorage.setItem("lastSelection", powerSelect.value);
    location.reload();
  }
}

let availableKW;
function updateHashGenerator() {
	const packageSelect = document.getElementById("packageSelect");
	const quantityInput = document.getElementById("quantityInput");
	const selectedOption = packageSelect.options[packageSelect.selectedIndex];
	const electricityInput = document.getElementById("electricityInput");
	const gasInput = document.getElementById("gasInput");
  const selectedValue = selectedOption.getAttribute("value1")
	quantityInput.value = selectedOption.getAttribute("package-quantity");
  document.getElementById("total-kw-available").value = selectedValue;
  availableKW = parseFloat(document.getElementById("total-kw-available").value);

  if (packageSelect.value == "1" || packageSelect.value == "2" || packageSelect.value == "3") {
    gasInput.style.display = "block";
    electricityInput.style.display = "none";
  } else if (packageSelect.value == "4" || packageSelect.value == "5" || packageSelect.value == "6" || packageSelect.value == "7" 
    || packageSelect.value == "8" || packageSelect.value == "9" || packageSelect.value == "10" || packageSelect.value == "11") {
      gasInput.style.display = "none";
      electricityInput.style.display = "block";
  } else {
      electricityInput.style.display = "none";
      gasInput.style.display = "none";
  }
}
  
// hashrate, bitcoin price, Hashprice
// var optionsLine = {
//   chart: {
//     height: 400,
//     type: 'line',
//     zoom: {
//       enabled: false
//     },
//     dropShadow: {
//       enabled: true,
//       top: 3,
//       left: 2,
//       blur: 4,
//       opacity: 1,
//     }
//   },
//   stroke: {
//     curve: 'smooth',
//     width: 2
//   },
//   //colors: ["#3F51B5", '#2196F3'],
//   series: [{
//       name: "Bitcoin Price",
//       data: [1, 15, 26, 20, 33, 27]
//     },
//     {
//       name: "Hash Price",
//       data: [3, 33, 21, 42, 19, 32]
//     },
//     {
//       name: "Hashrate",
//       data: [0, 39, 52, 11, 29, 43]
//     }
//   ],
//   title: {
//     text: 'Upstream Data Inc.',
//     align: 'left',
//     offsetY: 25,
//     offsetX: 20
//   },
//   // subtitle: {
//   //   text: 'Statistics',
//   //   offsetY: 55,
//   //   offsetX: 20
//   // },
//   markers: {
//     size: 6,
//     strokeWidth: 0,
//     hover: {
//       size: 9
//     }
//   },
//   grid: {
//     show: true,
//     padding: {
//       bottom: 0
//     }
//   },
//   labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
//   xaxis: {
//     tooltip: {
//       enabled: false
//     }
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'right',
//     offsetY: -20
//   }
// }

// var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
// chartLine.render();


// var optionsBar = {
//   chart: {
//     height: 400,
//     type: 'bar',
//     stacked: true,
//   },
//   plotOptions: {
//     bar: {
//       columnWidth: '30%',
//       horizontal: false,
//     },
//   },
//   series: [{
//     name: 'Gross Revenue (Producer)',
//     data: [1, 15, 26, 20, -33, -27, 19, 32, 29, 43]
//   }, {
//     name: 'Net Cash (Producer)',
//     data: [3, 33, 21, 42, 19, 32, 27, -19, -29, 43]
//   }, {
//     name: 'Gross Revenue (Miner)',
//     data: [0, 39, 52, 11, 29, 43, 27, 19, 19, -32]
//   }, {
//     name: 'Net Cash (Miner)',
//     data: [0, -39, 52, 11, 29, 43, 27, 19, -19, 32]
//   }],
//   xaxis: {
//     categories: ['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%', '0.00%'],
//   },
//   fill: {
//     opacity: 1
//   },

// }

// var chartBar = new ApexCharts(
//   document.querySelector("#barchart"),
//   optionsBar
// );

// chartBar.render();


// function replaceDropdownWithInput() {
//   const dynamicInputContainer = document.getElementById("dynamic-input-container");
//   const selectedValue = document.getElementById("reference-gasprice").value;

//   if (selectedValue === "6") {
//       // Replace dropdown with input field
//       dynamicInputContainer.innerHTML = "";
//       const inputField = createInputField();
//       dynamicInputContainer.appendChild(inputField);
//   } else {
    
//   }
// }

// document.getElementById("reference-gasprice").addEventListener("change", replaceDropdownWithInput);


// fetch(apigaspriceCAD)
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
//     if (Array.isArray(data) && data.length > 0) {
//         const mostRecentNatGasValue = data[data.length - 1].Value;
//         document.getElementById("reference-gasprice").options[1].textContent = mostRecentNatGasValue.toFixed(2) + " CAD";
//     } else {
//         console.error('Invalid or empty response from the API');
//     }
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });

// fetch(apigaspriceUSD)
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
//     const seriesData = data.series[0].data;
//     if (seriesData.length > 0) {
//         const mostRecentCloseValue = seriesData[seriesData.length - 1].close;
//         document.getElementById("reference-gasprice").options[2].textContent = mostRecentCloseValue.toFixed(2) + " USD";
//     } else {
//         console.log('No data available.');
//     }
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });



//
document.getElementById('printBtn').addEventListener('click', function () {
    printContent();
});

function printContent() {
    const printWindow = window.open('', '_blank');
    const content = generatePrintContent();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

function generatePrintContent() {
  calculate();
  RevenueBitcoinMining();
  const AsicHashrate = document.getElementById("asicHashrate").value;

  const content = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      <title>Upstream Data Calculator</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f8f9fa;
              padding-top: 20px;
          }
  
          .container {
              max-width: 800px; /* Set a max-width for a more readable content area on larger screens */
              margin: 0 auto;
          }
  
          .header-logo {
              text-align: center;
              margin-bottom: 20px;
          }
  
          .statistical-header {
              text-align: center;
              margin-bottom: 30px;
          }
  
          .input-value-title {
              background-color: #007bff;
              color: #fff;
              padding: 10px;
              border-radius: 5px;
              margin-bottom: 10px;
          }
  
          .form-group {
              margin-bottom: 10px;
              display: inline-block; 
              width: 30%; 
              margin-right: 1%; 
          }
  
          .form-group label {
              font-weight: bold;
          }
          .form-main {
            margin-bottom: 10px;
            display: inline-block; 
            width: 30%; 
            margin-right: 0%;           
          }
  
          .form-control {
              border: none;
              border-radius: 0;
          }
  
          .form-control:focus {
              border-color: #0056b3;
          }
  
          .date {
              text-align: center;
              margin-top: 30px;
          }
  
          @media print {
            body {
                max-width: 100%;
                margin: 0;
                background-color: #fff;
            }
        
            .container {
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
            }
        
            /* Add this section to set the size of the printed page */
            @page {
                size: A4;
                margin: 0;
            }
        
            .form-control {
                border: none;
                border-bottom: none;
                box-shadow: none;
            }
        
            .input-value-title {
                background-color: #000;
                color: #fff;
            }
        }
  
      </style>
  </head>
  
    <body>
        <div class="container">
            <div class="header-logo">
                <img id="logo" src="https://dev-upstreamdata-com.pantheonsite.io/wp-content/uploads/2022/11/UpstreamData_Logo_Bk.png" alt="Upstream Logo" class="img-fluid">
            </div>
    
              <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 mb-4 g-4">
                <div class="col">
                  <div class=form-main>
                    <p>BITCOIN PRICE</p>
                  </div>
                </div>
                <div class="col">
                  <div class=form-main>
                    <p>TOTAL NETWORK HASHRATE</p>
                  </div>
                </div>
                <div class="col">
                  <div class=form-main>
                    <p>DAILY MINED BITCOINS</P>
                  </div>  
                </div>
                <div class="col">
                  <div class=form-main>
                    <p><p>GROSS NETWORK REVENUE</p>
                  </div>     
                </div>             
              </div>
    
    
            <div class="input-value-title text-center">
            <h2>ASIC Miner</h2>
            </div>
            <div class="row row row-cols-1 row-cols-md-2 row-cols-xl-4">
                <div class="form-group">
                    <label for="asicHashrate">Loadcenter</label>
                </div>
                <div class="form-group">
                    <label for="asicModel">Asic Model</label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">Asic Hashrate TH/s</label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">ASIC Power Consumption (KW)
                    </label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">Quantity ASICs/Package
                    </label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">Reference Hashprice
                    </label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">Total Loadcenter KW
                    </label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">Estimated Fuel Gas (MCF/day)
                    </label>
                </div>
                <div class="form-group">
                    <label for="loadCenter">ASIC Daily Revenue 
                    </label>
                </div>
            </div>           

            <div class="input-value-title text-center">
                <h2>Capital Expenses</h2>
            </div>
           
            <div class="input-value-title text-center">
                <h2>Operating Expenses:Cash</h2>
            </div>
    
        
            <div class="input-value-title text-center">
                <h2>Operating Expenses: Non-Cash</h2>
            </div>
        
        
            <div class="input-value-title text-center">
                <h2>Indirect/Alternative Revenue</h2>
            </div>
        
        
            <div class="input-value-title text-center">
                <h2>Savlage Value of Package</h2>
            </div>
        
    
            <div class="date">
                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>

            <!-- <script>
                // Ensure the logo is loaded before printing
                const logo = document.getElementById('logo');
                logo.onload = function () {
                    window.print();
                }
            </script> -->
        </div>
  
        <!-- Bootstrap JS and Popper.js CDN for Bootstrap functionality -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  
</html>
`;

  return content;
}
