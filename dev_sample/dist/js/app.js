/**
 * Created by forbiz on 2019-02-11.
 */
import common from './divide/common';
import layout from './divide/layout';

const appMethods = {
    layout
};

const appInit = () => {
    const appName = $('body').attr('id');
    appMethods[appName]();
};

document.addEventListener('DOMContentLoaded', () => {
    appInit();
    common();
});