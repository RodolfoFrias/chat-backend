/* eslint-disable no-undef */
Parse.Cloud.define('hello', req => {
    req.log.info(req);
    return 'Hi';
  });
  
  Parse.Cloud.define('asyncFunction', async req => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 1000));
    req.log.info(req);
    return 'Hi async';
  });
  
  Parse.Cloud.beforeSave('Test', () => {
    throw new Parse.Error(9001, 'Saving test objects is not available.');
  });