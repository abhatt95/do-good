import scrapy
import json


class QuotesSpider(scrapy.Spider):
    name = "gnp"  ## gnp - Great Non Profits 
    folder = "data"
    fname = 'data/websites.json'
    organizations = []

    def start_requests(self):
        url = 'https://greatnonprofits.org/awards/browse/Campaign:Year2019/Issue:All/Page:'
        urls = []
        for i in range(1,15):
            urls.append(url+str(i))
        #urls = [
        #    'https://greatnonprofits.org/awards/browse/Campaign:Year2019/Issue:All/Page:1',
        #]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def writeToFile(self,data,fname):

        with open(self.folder+'/'+fname, 'w') as outfile:
            json.dump(data, outfile,indent=4)

    def parse(self, response):

        rows = response.xpath('//tbody/tr')
        
        

        print('-------------------')
        i = 0
        for row in rows:

            org = {}
            org['name'] = row.xpath('.//td[@itemprop=\'name\']/a/text()').get()
            org['city'] = row.xpath('.//td[@itemprop=\'address\']/span[@itemprop=\'addressLocality\']/text()').get()
            org['state'] = row.xpath('.//td[@itemprop=\'address\']/span[@itemprop=\'addressRegion\']/text()').get()
            causes = row.xpath('.//td[@itemprop=\'description\']/text()').get().strip()
            org['causes'] = [causes.split(',')]
            i += 1

            yield scrapy.Request(url=response.urljoin(row.xpath('.//td[@itemprop=\'name\']/a/@href').get()), callback=self.getDetail)
            
        print('-------------------')
        print(self.organizations)

    def getDetail(self, response):

        org = {}
        org['name'] = response.xpath('//h1[@itemprop=\'name\']/text()').get()
        org['url'] = response.xpath('//a[@class=\'link-shortcut\']/@href').get()
        getImage = response.xpath('//div[@class=\'slider-container-owl-carousel\']//img/@src').extract()
        if len(getImage) > 0:
            org['imageurl'] = 'https:' + getImage[0]
        org['causes'] = response.xpath('//p[@class=\'causes\']/a//text()').getall()
        org['contact'] = {
        'email' : response.xpath('//span/a[@itemprop=\'email\']/text()').get(),
        'phone' : response.xpath('//span[@itemprop=\'telephone\']/text()').get()
        }
        org['address'] = {
        'city' : response.xpath('//span[@itemprop=\'addressLocality\']/text()').get(),
        'country' : response.xpath('//span[@itemprop=\'addressCountry\']/text()').get(),
        'zipcode' : response.xpath('//span[@itemprop=\'postalCode\']/text()').get(),
        'state' : response.xpath('//span[@itemprop=\'addressRegion\']/text()').get().strip(),
        'streetAddress' : response.xpath('//span[@itemprop=\'streetAddress\']/text()').get()
        }
        getDetail = response.xpath('//div[@itemprop=\'description\']//p[2]//text()').getall()
        if len(getDetail) > 2:
            org['description'] = [1]
        self.organizations.append(org)

        print(org)
        with open(self.fname) as feedsjson:
            feeds = json.load(feedsjson)
        feeds.append(org)
        with open(self.fname, mode='w') as f:
            f.write(json.dumps(feeds, indent=4))


        


