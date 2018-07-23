const expect = require('chai').expect;
const pipelineASync = require('../src/asyncPipeline').pipelineASync;
const path = require('path');

describe('pipelineASync', () => {
    it('exists', () => {
        expect(pipelineASync).to.be.ok;
    });
    it('parses and returns result', (done) => {
        const filePath = path.join(__dirname, '../files', 'one.txt');
        pipelineASync(`set 0 | addFromFile ${filePath} | add 1 | mult 21`, (err, result) => {
            expect(result).to.equal(42);
            expect(err).to.be.null;
            done();
        });
    });
});

