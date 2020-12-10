var dns = require('dns');

export default {
    MyService: {
        MyPort: {
            MyFunction: function(args, callback) {
                console.log(args);
                if(!args.domain) {
                    return {
                        ip: 'Please pass a domain name like google.com'
                    }
                }else {
                    dns.lookup(args.domain, function (err, addresses, family) {
                        console.log(addresses, family);
                        callback({
                            ip: addresses
                        });
                    });
                }
            }
        }
    }
};