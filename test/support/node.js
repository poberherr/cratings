var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.sinon = sinon;
global.should = should;
global.expect = chai.expect;
global.chai = chai;
