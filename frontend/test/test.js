var expect = require("chai").expect; // chai断言库
var axios = require("axios")

console.log("后台接口测试...");

describe('request',function () {
    it('获取用户列表接口返回',(done)=> {
        axios.get('http://localhost:3033/api/getUserList')
            .then(function (res) {
                expect(res.status).to.equal(200);
                done();
            }).catch(function (err) {
            done(err)
        });
    })
});

describe('request',function () {
    it('用户登录接口返回',(done)=> {
        axios.post('http://localhost:3033/api/login',{"mobile":"13000000001","password":"123456"})
            .then(function (res) {
                expect(res.status).to.equal(200);
                done();
            }).catch(function (err) {
            done(err)
        });
    })
});

describe('request',function () {
    it('用户注册接口返回',(done)=> {
        axios.get('http://localhost:3033/api/register','data={"mobile":"13000000001","password":"123456","name":"chenlu1","address":"Heilongjiang"}')
            .then(function (res) {
                console.log(res)
                expect(res.status).to.equal(200);
                done();
            }).catch(function (err) {
            done(err)
        });
    })
});
