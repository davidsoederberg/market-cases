const debug = require('debug')('b-rscase:cron:update-prices.js');
const chalk = require('chalk');
const Securities = require('../../../../models/securities');
const Stock = require('../../api/stock-data');
const Gold = require('../../api/gold-data');
const Currency = require('../../api/currency-data');

exports.getData = async (securities) => {
  try {
    let data = [];
    const type0Securities = getType(securities, 0);
    if (type0Securities.length !== 0) {
      const type0 = await type0Data(type0Securities);
      for (const type of type0) {
        data = data.concat(type);
      }
    }
    for (const security of securities) {
      if (security.type !== 0) {
        /* eslint no-await-in-loop:0 */
        const newData = await getData(security);
        data.push(newData);
      }
    }
    return await Promise.all(data);
  } catch (e) {
    debug(chalk.red(e));
    throw e;
  }
};

exports.getSecurities = async () => new Promise((resolve, reject) => {
  Securities.find({}, (err, securities) => {
    if (err) {
      debug(chalk.red(err));
      reject(err);
    } else {
      resolve(securities);
    }
  });
});

async function getData(security) {
  try {
    return new Promise((resolve, reject) => {
      if (security.type === 1) {
        const data = Stock.delay(security.symbol);
        resolve(data);
      } else if (security.type === 2) {
        const split = security.symbol.split('/');
        const from = split[0];
        const to = split[1];
        const data = Currency.currencyRate(from, to);
        resolve(data);
      } else if (security.type === 3) {
        const data = Gold.goldprice();
        resolve(data);
      } else {
        reject(new Error('Invalid security type (VALID: 1,2,3)'));
      }
    });
  } catch (e) {
    debug(chalk.red(e));
    throw e;
  }
}

function getType(securities, secType) {
  if (secType < 0 || secType > 3) {
    debug(chalk.red('Invalid type argument in getType()'));
    throw new Error('Invalid type argument in getType()');
  }
  return securities.filter(({ type }) => type === secType);
}

async function type0Data(securities) {
  try {
    const symbolArray = [];
    const data = [];
    /* eslint no-restricted-syntax:0 */
    for (const security of securities) {
      symbolArray.push(security.symbol);
    }
    const iterations = Math.ceil(symbolArray.length / 5);
    for (let i = 0; i < iterations; i += 1) {
      const start = 5 * i;
      const update = symbolArray.slice(start, start + 5);
      const newData = Stock.realTime(update);
      data.push(newData);
    }
    return await Promise.all(data);
  } catch (e) {
    debug(e);
    throw e;
  }
}
