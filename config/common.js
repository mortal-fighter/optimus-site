module.exports = {
	app: {
		mode: 'production',
		port: 80,
		emailAdmin: 'rostoveoptimus@yandex.ru'
	},
	database: {
		host: '127.0.0.1',
		port: 3306,
		user: 'optimus',
		password: 'TW{zL}',
		database: 'optimus'
	},
	wysibb: {
		options: {
			buttons: "bold,italic,underline,|,img,link"
		}
	},
	auth: {
		username: 'optimus',
		password: 'JM}FGZ'
	},
	vk: {
		ownerIDtemp: -134709374, // костыль
		ownerID: -129910076,
		albums: {
			slideshow: {
				id: 238474797,
				count: 5
			}
		}
	},
	mailer: { 
		smtpConfig: {
			service: "gmail",
			auth: {
				user: 'rostove.optimus@gmail.com',
				pass: 'boPDXlcRIL'
			}
		}
	},
	recaptcha: {
		secret: '6Lf6rQ8UAAAAAIBpeWNFCRmiUddND1BPR6eCiA61',
		siteKey: '6Lf6rQ8UAAAAAHeN1O2CbPiGXY3_MXiD0JxYJGO3'
	},
	logger: {
		level: 'DEBUG'
	}
};