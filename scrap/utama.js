const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require("axios")
const request = require('request')
const qs = require("qs")
const url = require('url')

async function zippy(Url) {
	return new Promise(async(resolve, reject) => { 
		try {
			axios.get(Url).then(res => {
				let result = {}
				const $ = cheerio.load(res.data)
				let text = $('#lrbox').find('div.center > div:nth-child(1)').text().split('\n')
				result.title = (text[3] ||'').trim()
				result.size = ((text[4] || '').replace('Size:', '') || '').trim()
				result.upload_date = ((text[5] || '').replace('Uploaded:', '') || '').trim()
				$('script').each((i, e) => {
					let sc = $(e).html().search(/dlbutton/g)
					if (sc >= 0) {
						let divider = $(e).html().split(';')[0]
						let decrypt = divider.split("document.getElementById('dlbutton').href =")[1]
						console.log(decrypt)
						let _url
						if (decrypt) {
							_url = url.parse(Url).hostname + eval(decrypt)
							_url = _url.startsWith('http') ? _url : 'http://' + _url
							const url_final = _url
							result.url = url_final
						}
					}
				})
				resolve(result)
			})
		} catch(e) {
			console.log(e)
		}
	})
}

function twitter(url) {
    return new Promise((resolve, reject) => {
        let params = new URLSearchParams()
        params.append('URL', url)
        fetch('https://twdown.net/download.php', { method: 'POST', body: params })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res);
                data = []
                $('div.container').find('tbody > tr > td').each(function (index, element) {
                    x = $(this).find('a').attr('href')
                    if (x !== '#') {
                        if (typeof x !== 'undefined') {
                            data.push({ url: x })
                        }
                    }
                })
                if (data.length == 0) return resolve({ status: false })
                resolve({ status: true, data })
            }).catch(reject)
    })
}

function ghstalk(username) {
urlgh = `https://api.github.com/users/${username}`; 
return axios.get(urlgh)
.then(data => {
return data.data
console.log(data.data)
})
}


function covid() {
return new Promise(async(resolve, reject) => {
axios.get('https://covid19.go.id/')
.then(({ data }) => {
const $ = cheerio.load(data)
const hasil = [];
$('#case > div > div > div > div > div:nth-child(2)').each(function(a,b) {
const pindo = $(b).find('div:nth-child(3) > strong').text()
const mindo = $(b).find('div:nth-child(5) > strong').text()
const sindo = $(b).find('div:nth-child(4) > strong').text()
const upindo = $(b).find('div.pt-4.text-color-black.text-1').text().trim()
$('#case > div > div > div > div > div:nth-child(1)').each(function(c,d) {
const neg = $(d).find('div:nth-child(3) > strong').text() 
const pglo = $(d).find('div:nth-child(4) > strong').text()
const nglo = $(d).find('div:nth-child(5) > strong').text()
const up = $(d).find('div.pt-4.text-color-grey.text-1').text().trim()
const result = {
indonesia : {
kasus: pindo,
kematian: mindo,
sembuh: sindo,
update: upindo.split(':')[1]
},
global: {
negara: neg,
kasus: pglo,
kematian: nglo,
update: up.split(':')[1].split('\n')[0]
}
}
hasil.push(result)
})
})
resolve(hasil)
console.log(hasil)
})
.catch(reject)
})
}

async function kodepos(kota) {
return new Promise(async (resolve, reject) => {
let postalcode = 'https://carikodepos.com/';
let url = postalcode+'?s='+kota;
await request.get({
headers: {
'Accept': 'application/json, text/javascript, */*;',
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
'Origin': postalcode,
'Referer': postalcode
},
url: url,
}, function(error, response, body) {
if (error) return reject(error);
let $ = cheerio.load(body);
var search = $('tr');
if (!search.length) return reject('No result could be found');
var results = [];
search.each(function(i) {
if (i != 0) {
var td = $(this).find('td');
var result = {};
td.each(function(i) {
var value = $(this).find('a').html();
var key = (i == 0) ? 'province' : (i == 1) ? 'city' : (i == 2) ? 'subdistrict' : (i == 3) ? 'urban' : 'postalcode';
result[key] = value;
})
results.push(result);
}
});
return resolve(results);
console.log(results)
});
});
};


function gempa() {
return new Promise((resolve, reject) => {
axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg').then((response) => {
const $ = cheerio.load(response.data)
const urlElems = $('table.table-hover.table-striped')
for (let i = 0; i < urlElems.length; i++) {
const urlSpan = $(urlElems[i]).find('tbody')[0]
if (urlSpan) {
const urlData = $(urlSpan).find('tr')[0]
var Kapan = $(urlData).find('td')[1]
var Letak = $(urlData).find('td')[2]
var Magnitudo = $(urlData).find('td')[3]
var Kedalaman = $(urlData).find('td')[4]
var Wilayah = $(urlData).find('td')[5]
var lintang = $(Letak).text().split(' ')[0]
var bujur = $(Letak).text().split(' ')[2]
var hasil = {
Waktu: $(Kapan).text(),
Lintang: lintang,
Bujur: bujur,
Magnitudo: $(Magnitudo).text(),
Kedalaman: $(Kedalaman).text().replace(/\t/g, '').replace(/I/g, ''),
Wilayah: $(Wilayah).text().replace(/\t/g, '').replace(/I/g, '').replace('-','').replace(/\r/g, '').split('\n')[0],
Map: ''
}
resolve(hasil);
console.log(hasil)
}
}
})
})
}



function happymod(query) {
return new Promise((resolve, reject) => {
axios.get(`https://www.happymod.com/search.html?q=${query}`).then(async tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.pdt-app-box").each(function(c, d) {
name = $(d).find("a").text().trim();
icon = $(d).find("img.lazy").attr('data-original');
link = $(d).find("a").attr('href');
link2 = `https://www.happymod.com${link}`
const Data = {

icon: icon,
name: name,
link: link2
}
hasil.push(Data)
 })
 resolve(hasil);
}).catch(reject)
});
}

function halal(query, page) {
return new Promise((resolve, reject) => {
axios.get(`https://www.halalmui.org/mui14/searchproduk/search/?kategori=nama_produk&katakunci=${query}&page=${page}`).then( tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("tr > td").each(function(c, d) {
name = $(d).find("span").eq(0).text()
namee = name.replace('Nama Produk :', '')
nmr = $(d).find("span").eq(1).text()
nmrr = nmr.replace('Nomor Sertifikat :', '')
const Data = {
title: namee,
nomorsertifikat: nmrr
}
hasil.push(Data)
resolve(hasil)
}).catch(reject)
})
})
}


function sfilesearch(query) {
return new Promise((resolve, reject) => {
axios.get(`https://sfile.mobi/search.php?q=${query}&search=Search`).then(async tod => {
const $ = cheerio.load(tod.data)
hasil = []
$("div.list").each(function(i, cuk) {
ico= $(cuk).find("img").attr("src");
lin= $(cuk).find("a").attr("href");
name= $(cuk).find("a").text();
const Data = {
icon: ico,
name: name,
link: lin
}
hasil.push(Data)

})
resolve(hasil)
});
});
}

module.exports = {
	twitter,
ghstalk,
covid,
kodepos,
gempa,
happymod,
sfilesearch,
zippy,
halal
	}