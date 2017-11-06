import * as https from 'https';
import * as request from 'request'
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as pinExtractor from './getPincode';

let url = 'https://www.mapsofindia.com/pincode/data.php'
var postDate = 'get="state"';

var headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

var states = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]

var allData = {
    Chandigarh: {
        CHANDIGARH: '102'
    },
    'Andhra Pradesh': {
        ANANTAPUR: '5',
        CHITTOOR: '6',
        CUDDAPAH: '7',
        'EAST GODAVARI': '8',
        GUNTUR: '9',
        KRISHNA: '14',
        KURNOOL: '15',
        NELLORE: '19',
        PRAKASAM: '21',
        SRIKAKULAM: '22',
        VISAKHAPATNAM: '23',
        VIZIANAGARAM: '24',
        'WEST GODAVARI': '26'
    },
    Bihar: {
        ARARIA: '65',
        AURANGABAD: '66',
        BANKA: '67',
        BEGUSARAI: '68',
        BHAGALPUR: '69',
        BHOJPUR: '70',
        BUXAR: '71',
        DARBHANGA: '72',
        'EAST CHAMPARAN': '73',
        GAYA: '74',
        GOPALGANJ: '75',
        JAMUI: '76',
        JEHANABAD: '77',
        'KAIMUR (BHABUA)': '78',
        KATIHAR: '79',
        KHAGARIA: '80',
        KISHANGANJ: '81',
        LAKHISARAI: '82',
        MADHEPURA: '83',
        MADHUBANI: '84',
        MUNGER: '85',
        MUZAFFARPUR: '86',
        NALANDA: '87',
        NAWADA: '88',
        PATNA: '89',
        PURNIA: '90',
        ROHTAS: '91',
        SAHARSA: '92',
        SAMASTIPUR: '93',
        SARAN: '94',
        SHEIKHPURA: '95',
        SHEOHAR: '96',
        SITAMARHI: '97',
        SIWAN: '98',
        SUPAUL: '99',
        VAISHALI: '100',
        'WEST CHAMPARAN': '101'
    },
    'Andaman and Nicobar Islands': {
        NICOBAR: '1',
        'NORTH AND MIDDLE ANDAMAN': '2',
        'SOUTH ANDAMAN': '3'
    },
    'Daman and Diu': {
        DAMAN: '122',
        DIU: '123'
    },
    'Arunachal Pradesh': {
        CHANGLANG: '27',
        'DIBANG VALLEY': '28',
        'EAST KAMENG': '29',
        'EAST SIANG': '30',
        'KURUNG KUMEY': '31',
        LOHIT: '32',
        'LOWER DIBANG VALLEY': '33',
        'LOWER SUBANSIRI': '34',
        'PAPUM PARE': '35',
        TAWANG: '36',
        TIRAP: '37',
        'UPPER SIANG': '38',
        'UPPER SUBANSIRI': '39',
        'WEST KAMENG': '40',
        'WEST SIANG': '41'
    },
    Assam: {
        BARPETA: '42',
        BONGAIGAON: '43',
        CACHAR: '44',
        DARRANG: '45',
        DHEMAJI: '46',
        DHUBRI: '47',
        DIBRUGARH: '48',
        GOALPARA: '49',
        GOLAGHAT: '50',
        HAILAKANDI: '51',
        JORHAT: '52',
        KAMRUP: '53',
        'KARBI ANGLONG': '54',
        KARIMGANJ: '55',
        KOKRAJHAR: '56',
        LAKHIMPUR: '57',
        MARIGAON: '58',
        NAGAON: '59',
        NALBARI: '60',
        'NORTH CACHAR HILLS': '61',
        'SIVASAGAR SIBSAGAR': '62',
        SONITPUR: '63',
        TINSUKIA: '64'
    },
    'Dadra and Nagar Haveli': {
        'DADRA AND NAGAR HAVELI': '121'
    },
    Delhi: {
        'CENTRAL DELHI': '124',
        'EAST DELHI': '125',
        'NEW DELHI': '126',
        'NORTH DELHI': '127',
        'NORTH WEST DELHI': '128',
        'SOUTH DELHI': '129',
        'SOUTH WEST DELHI': '130',
        'WEST DELHI': '131'
    },
    Haryana: {
        AMBALA: '159',
        BHIWANI: '160',
        FARIDABAD: '161',
        FATEHABAD: '162',
        GURGAON: '163',
        HISAR: '164',
        JHAJJAR: '165',
        JIND: '166',
        KAITHAL: '167',
        KARNAL: '168',
        KURUKSHETRA: '169',
        MAHENDRAGARH: '170',
        PANCHKULA: '171',
        PANIPAT: '172',
        REWARI: '173',
        ROHTAK: '174',
        SIRSA: '175',
        SONIPAT: '176',
        'YAMUNA NAGAR': '177'
    },
    Chhattisgarh: {
        BASTAR: '103',
        BIJAPUR: '104',
        BILASPUR: '105',
        DANTEWADA: '106',
        DHAMTARI: '107',
        DURG: '108',
        'JANJGIR-CHAMPA': '109',
        JASHPUR: '110',
        KANKER: '111',
        KAWARDHA: '112',
        KORBA: '113',
        KORIYA: '114',
        MAHASAMUND: '115',
        NARAYANPUR: '116',
        RAIGARH: '117',
        RAIPUR: '118',
        RAJNANDGAON: '119',
        SURGUJA: '120'
    },
    Gujarat: {
        AHMEDABAD: '134',
        AMRELI: '135',
        ANAND: '136',
        BANASKANTHA: '137',
        BHARUCH: '138',
        BHAVNAGAR: '139',
        DAHOD: '140',
        'GANDHI NAGAR': '141',
        JAMNAGAR: '142',
        JUNAGADH: '143',
        KACHCHH: '144',
        KHEDA: '145',
        MAHESANA: '146',
        NARMADA: '147',
        NAVSARI: '148',
        'PANCH MAHALS': '149',
        PATAN: '150',
        PORBANDAR: '151',
        RAJKOT: '152',
        SABARKANTHA: '153',
        SURAT: '154',
        'SURENDRA NAGAR': '155',
        'THE DANGS': '156',
        VADODARA: '157',
        VALSAD: '158'
    },
    Goa: {
        'NORTH GOA': '132',
        'SOUTH GOA': '133'
    },
    'Himachal Pradesh': {
        BILASPUR: '105',
        CHAMBA: '178',
        HAMIRPUR: '179',
        KANGRA: '180',
        KINNAUR: '181',
        KULLU: '182',
        'LAHUL AND SPITI': '183',
        MANDI: '184',
        SHIMLA: '185',
        SIRMAUR: '186',
        SOLAN: '187',
        UNA: '188'
    },
    'Jammu and Kashmir': {
        ANANTHNAG: '189',
        BARAMULLA: '190',
        BUDGAM: '191',
        DODA: '192',
        KARGIL: '194',
        KATHUA: '195',
        KUPWARA: '196',
        LEH: '197',
        POONCH: '198',
        PULWAMA: '199',
        RAJAURI: '200',
        SAMBA: '193',
        SRINAGAR: '201',
        UDHAMPUR: '202'
    },
    Karnataka: {
        BAGALKOT: '226',
        BANGALORE: '227',
        'BANGALORE RURAL': '228',
        BELGAUM: '229',
        BELLARY: '230',
        BIDAR: '231',
        BIJAPUR: '104',
        CHAMRAJNAGAR: '232',
        CHICKMAGALUR: '233',
        CHITRADURGA: '234',
        'DAKSHINA KANNADA': '235',
        DAVANGARE: '236',
        DHARWARD: '237',
        GADAG: '238',
        GULBARGA: '239',
        HASSAN: '240',
        HAVERI: '241',
        KODAGU: '242',
        KOLAR: '243',
        KOPPAL: '244',
        MANDYA: '245',
        MYSORE: '246',
        RAICHUR: '247',
        SHIMOGA: '248',
        TUMKUR: '249',
        UDUPI: '250',
        'UTTARA KANNADA': '251'
    },
    Jharkhand: {
        BOKARO: '203',
        CHATRA: '204',
        DEOGHAR: '205',
        DHANBAD: '206',
        DUMKA: '207',
        'EAST SINGHBHUM': '208',
        GARHWA: '209',
        GIRIDH: '210',
        GODDA: '211',
        GUMLA: '212',
        HAZARIBAG: '213',
        JAMTARA: '214',
        KODERMA: '215',
        LATEHAR: '216',
        LOHARDAGA: '217',
        PAKUR: '218',
        PALAMAU: '219',
        RAMGARH: '220',
        RANCHI: '221',
        SAHIBGANJ: '222',
        'SERAIKELA-KHARSAWAN': '223',
        SIMDEGA: '224',
        'WEST SINGHBHUM': '225'
    },
    Maharashtra: {
        AHMEDNAGAR: '315',
        AKOLA: '316',
        AMRAVATI: '317',
        AURANGABAD: '66',
        BEED: '318',
        BHANDARA: '319',
        BULDHANA: '320',
        CHANDRAPUR: '321',
        DHULE: '322',
        GADCHIROLI: '323',
        GONDIA: '324',
        HINGOLI: '325',
        JALGAON: '326',
        JALNA: '327',
        KOLHAPUR: '328',
        LATUR: '329',
        MUMBAI: '330',
        NAGPUR: '331',
        NANDED: '332',
        NANDURBAR: '333',
        NASHIK: '334',
        OSMANABAD: '335',
        PARBHANI: '336',
        PUNE: '337',
        RAIGAD: '338',
        RATNAGIRI: '339',
        SANGLI: '340',
        SATARA: '341',
        SINDHUDURG: '342',
        SOLAPUR: '343',
        THANE: '344',
        WARDHA: '345',
        WASHIM: '346',
        YAVATMAL: '347'
    },
    Kerala: {
        ALAPPUZHA: '252',
        ERNAKULAM: '253',
        IDUKKI: '254',
        KANNUR: '255',
        KASARGOD: '256',
        KOLLAM: '257',
        KOTTAYAM: '258',
        KOZHIKODE: '259',
        MALAPPURAM: '260',
        PALAKKAD: '261',
        PATHANAMTHITTA: '262',
        THIRUVANANTHAPURAM: '263',
        THRISSUR: '264',
        WAYANAD: '265'
    },
    Manipur: {
        BISHNUPUR: '348',
        CHANDEL: '349',
        CHURACHANDPUR: '350',
        'IMPHAL EAST': '351',
        'IMPHAL WEST': '352',
        SENAPATI: '353',
        TAMENGLONG: '354',
        THOUBAL: '355',
        UKHRUL: '356'
    },
    'Madhya Pradesh': {
        ANUPPUR: '267',
        ASHOKNAGAR: '268',
        BALAGHAT: '269',
        BARWANI: '270',
        BETUL: '271',
        BHIND: '272',
        BHOPAL: '273',
        BURHANPUR: '274',
        CHHATARPUR: '275',
        CHHINDWARA: '276',
        DAMOH: '277',
        DATIA: '278',
        DEWAS: '279',
        DHAR: '280',
        DINDORI: '281',
        GUNA: '282',
        GWALIOR: '283',
        HARDA: '284',
        HOSHANGABAD: '285',
        INDORE: '286',
        JABALPUR: '287',
        JHABUA: '288',
        KATNI: '289',
        'KHANDWA East Nimar': '290',
        'KHARGONE West Nimar': '291',
        MANDLA: '292',
        MANDSAUR: '293',
        MORENA: '294',
        NARSINGHPUR: '295',
        NEEMUCH: '296',
        PANNA: '297',
        RAISEN: '298',
        RAJGARH: '299',
        RATLAM: '300',
        REWA: '301',
        SAGAR: '302',
        SATNA: '303',
        SEHORE: '304',
        SEONI: '305',
        SHAHDOL: '306',
        SHAJAPUR: '307',
        SHEOPUR: '308',
        SHIVPURI: '309',
        SIDHI: '310',
        TIKAMGARH: '311',
        UJJAIN: '312',
        UMARIA: '313',
        VIDISHA: '314'
    },
    Nagaland: {
        DIMAPUR: '372',
        KIPHIRE: '373',
        KOHIMA: '374',
        LONGLENG: '375',
        MOKOKCHUNG: '376',
        MON: '377',
        PEREN: '378',
        PHEK: '379',
        TUENSANG: '380',
        WOKHA: '381',
        ZUNHEBOTTO: '382'
    },
    Mizoram: {
        AIZAWL: '364',
        CHAMPHAI: '365',
        KOLASIB: '366',
        LAWNGTLAI: '367',
        LUNGLEI: '368',
        MAMMIT: '369',
        SAIHA: '370',
        SERCHHIP: '371'
    },
    Lakshadweep: {
        LAKSHADWEEP: '266'
    },
    Meghalaya: {
        'EAST GARO HILLS': '357',
        'EAST KHASI HILLS': '358',
        'JAINTIA HILLS': '359',
        'RI BHOI': '360',
        'SOUTH GARO HILLS': '361',
        'WEST GARO HILLS': '362',
        'WEST KHASI HILLS': '363'
    },
    Orissa: {
        ANGUL: '383',
        BALANGIR: '384',
        BALESWAR: '385',
        BARGARH: '386',
        BHADRAK: '387',
        BOUDH: '388',
        CUTTACK: '389',
        'DEBAGARH Deogarh': '390',
        DHENKANAL: '391',
        GAJAPATI: '392',
        GANJAM: '393',
        JAGATSINGHAPUR: '394',
        JAJAPUR: '395',
        JHARSUGUDA: '396',
        KALAHANDI: '397',
        KANDHAMAL: '398',
        KENDRAPARA: '399',
        KENDUJHAR: '400',
        'KHURDA Khordha': '401',
        KORAPUT: '402',
        MALKANGIRI: '403',
        MAYURBHANJ: '404',
        NABARANGAPUR: '405',
        NAYAGARH: '406',
        NUAPADA: '407',
        PURI: '408',
        RAYAGADA: '409',
        SAMBALPUR: '410',
        'SONAPUR Subarnapur': '411',
        SUNDERGARH: '412'
    },
    Puducherry: {
        KARAIKAL: '413',
        MAHE: '414',
        PONDICHERRY: '415'
    },
    'Tamil Nadu': {
        ARIYALUR: '470',
        CHENNAI: '471',
        COIMBATORE: '472',
        CUDDALORE: '473',
        DHARMAPURI: '474',
        DINDIGUL: '475',
        ERODE: '476',
        KANCHIPURAM: '477',
        KANYAKUMARI: '478',
        KARUR: '479',
        KRISHNAGIRI: '480',
        MADURAI: '481',
        NAGAPATTINAM: '482',
        NAMAKKAL: '483',
        NILGIRIS: '484',
        PERAMBALUR: '485',
        PUDUKKOTTAI: '486',
        RAMANATHAPURAM: '487',
        SALEM: '488',
        SIVAGANGA: '489',
        THANJAVUR: '490',
        THENI: '491',
        TIRUCHIRAPPALLI: '492',
        TIRUNELVELI: '493',
        TIRUVALLUR: '494',
        TIRUVANNAMALAI: '495',
        TIRUVARUR: '496',
        'TUTICORIN Thoothukudi': '497',
        VELLORE: '498',
        VILLUPURAM: '499',
        VIRUDHUNAGAR: '500'
    },
    Punjab: {
        AMRITSAR: '416',
        BATHINDA: '417',
        FARIDKOT: '418',
        'FATEHGARH SAHIB': '419',
        FIROZPUR: '420',
        GURDASPUR: '421',
        HOSHIARPUR: '422',
        JALANDHAR: '423',
        KAPURTHALA: '424',
        LUDHIANA: '425',
        MANSA: '426',
        MOGA: '427',
        MOHALI: '428',
        MUKTSAR: '429',
        NAWANSHAHR: '430',
        PATIALA: '431',
        'ROPAR Rupnagar': '432',
        SANGRUR: '433'
    },
    Rajasthan: {
        AJMER: '434',
        ALWAR: '435',
        BANSWARA: '436',
        BARAN: '437',
        BARMER: '438',
        BHARATPUR: '439',
        BHILWARA: '440',
        BIKANER: '441',
        BUNDI: '442',
        CHITTORGARH: '443',
        CHURU: '444',
        DAUSA: '445',
        DHOLPUR: '446',
        DUNGARPUR: '447',
        HANUMANGARH: '449',
        JAIPUR: '450',
        JAISALMER: '451',
        JALOR: '452',
        JHALAWAR: '453',
        JHUNJHUNU: '454',
        JODHPUR: '455',
        KARAULI: '456',
        KOTA: '457',
        NAGAUR: '458',
        PALI: '459',
        RAJSAMAND: '460',
        'SAWAI MADHOPUR': '461',
        SIKAR: '462',
        SIROHI: '463',
        'SRI GANGANAGAR': '448',
        TONK: '464',
        UDAIPUR: '465'
    },
    Tripura: {
        AGRA: '505',
        ALIGARH: '506',
        ALLAHABAD: '507',
        'AMBEDKAR NAGAR': '508',
        AURAIYA: '509',
        AZAMGARH: '510',
        BAGPAT: '511',
        BAHRAICH: '512',
        BALLIA: '513',
        BALRAMPUR: '514',
        BANDA: '515',
        BARABANKI: '516',
        BAREILLY: '517',
        BASTI: '518',
        BIJNOR: '519',
        BUDAUN: '520',
        BULANDSHAHR: '521',
        CHANDAULI: '522',
        CHITRAKOOT: '523',
        DEORIA: '524',
        ETAH: '525',
        ETAWAH: '526',
        FAIZABAD: '527',
        FARRUKHABAD: '528',
        FATEHPUR: '529',
        FIROZABAD: '530',
        'GAUTAM BUDDHA NAGAR': '531',
        GHAZIABAD: '532',
        GHAZIPUR: '533',
        GONDA: '534',
        GORAKHPUR: '535',
        HAMIRPUR: '179',
        HARDOI: '536',
        HATHRAS: '537',
        JALAUN: '538',
        JAUNPUR: '539',
        JHANSI: '540',
        'JYOTIBA PHULE NAGAR': '541',
        KANNAUJ: '542',
        'KANPUR DEHAT': '543',
        'KANPUR NAGAR': '544',
        KAUSHAMBI: '545',
        KHERI: '546',
        KUSHINAGAR: '547',
        LALITPUR: '548',
        LUCKNOW: '549',
        MAHARAJGANJ: '550',
        MAHOBA: '551',
        MAINPURI: '552',
        MATHURA: '553',
        MAU: '554',
        MEERUT: '555',
        MIRZAPUR: '556',
        MORADABAD: '557',
        MUZAFFARNAGAR: '558',
        PILIBHIT: '559',
        PRATAPGARH: '560',
        RAEBARELI: '561',
        RAMPUR: '562',
        SAHARANPUR: '563',
        'SANT KABIR NAGAR': '564',
        'SANT RAVIDAS NAGAR': '565',
        SHAHJAHANPUR: '566',
        SHRAWASTI: '567',
        SIDDHARTHNAGAR: '568',
        SITAPUR: '569',
        SONBHADRA: '570',
        SULTANPUR: '571',
        UNNAO: '572',
        VARANASI: '573'
    },
    Uttarakhand: {
        BANKURA: '587',
        BARDHAMAN: '588',
        BIRBHUM: '589',
        'COOCH BEHAR': '590',
        DARJEELING: '591',
        'East Medinipur': '592',
        HOOGHLY: '593',
        HOWRAH: '594',
        JALPAIGURI: '595',
        KOLKATA: '596',
        MALDA: '597',
        MURSHIDABAD: '598',
        NADIA: '599',
        'NORTH 24 PARGANAS': '600',
        'NORTH DINAJPUR Uttar': '601',
        PURULIA: '602',
        'SOUTH 24 PARGANAS': '603',
        'SOUTH DINAJPUR Dakshin': '604',
        'WEST MEDINIPUR': '606',
        'WEST MIDNAPORE': '605'
    },
    'Uttar Pradesh': {
        ALMORA: '574',
        BAGESHWAR: '575',
        CHAMOLI: '576',
        CHAMPAWAT: '577',
        DEHRADUN: '578',
        HARIDWAR: '579',
        NAINITAL: '580',
        'PAURI GARHWAL': '581',
        PITHORAGARH: '582',
        RUDRAPRAYAG: '583',
        'TEHRI GARHWAL': '584',
        'UDHAM SINGH NAGAR': '585',
        UTTARKASHI: '586'
    },
    'West Bengal': {
        ADILABAD: '4',
        HYDERABAD: '10',
        'KARIM NAGAR': '12',
        KHAMMAM: '13',
        MAHABUBNAGAR: '16',
        MEDAK: '17',
        NALGONDA: '18',
        NIZAMABAD: '20',
        Rangareddi: '11',
        WARANGAL: '25'
    }
}

let test = {
    'Tamil Nadu':'',
    'Kerala':''
}



var object = {};
let count =0;
for (let state in test) {
    
    let stateCode = states.indexOf(state);
    object[state] = {}
    for (let distrct in allData[state]) {

        setTimeout(()=>{

            let req = `get=loc&state=${stateCode+1}&district=${allData[state][distrct]}`
            // console.log(req);
                makerRequest(req)
                    .then(res=>{

                        object[state][distrct]={};
                        
                        for(let m=0;m<res.length;m++){
                            object[state][distrct][res[m]] = '';
                            let stateUrl= replaceAll(state.toLowerCase(),' ','-');
                            let distUrl = replaceAll(distrct.toLowerCase(),' ','-');
                            let cityUrl = replaceAll(res[m].toLowerCase(),' ','-')

                            let pinurl = `https://www.mapsofindia.com/pincode/india/${stateUrl}/${distUrl}/${cityUrl}.html`
                            
                            pinExtractor(pinurl,p=>{
                                object[state][distrct][res[m]] = p;
                                console.log(p)
                            })
                            count++;
                            if(count == 17047){
                                fs.writeFile('allCitiesTN-KER.json',JSON.stringify(object),console.log);
                            }
                        }
                        // 
                        // if(count==602){
                        //     fs.writeFile('allCities.json',JSON.stringify(object),console.log)
                        // }
                    })
                
        },200)
        
            
                
    }
    // object[state] = {}
}



function makerRequest(data) {
    return new Promise((resolve, reject) => {

        var requestOptions = {
            url: url,
            headers: headers,
            method: 'POST',
            body: data,
            json: true
        }

        request(
            requestOptions,
            function (error, response, body) {
                
                if(body)
                {
                    
                    body.replace(/\\/g, "")
                    body = replaceAll(body, "'", '"');
                    body = body.split('*');
                    body = JSON.parse(body[0])
                    resolve(body)
                }
                
            }
        );
    })
}

function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
};


