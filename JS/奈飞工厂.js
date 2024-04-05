var rule = {
     title: '奈飞工厂',
     host: 'https://www.netflixgc.com',
     模板:'短视2',
     searchUrl: '/vodsearch/**-------------/',
     url:'/index.php/api/vod#type=fyclass&page=fypage',
     detailUrl:'/detail/fyid.html',
     searchable: 2,//是否启用全局搜索,
     quickSearch: 1,//是否启用快速搜索,
     filterable:0,//是否启用分类筛选,
     headers: {
       'User-Agent': 'MOBILE_UA'
     },
     lazy:`js:
         var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
         var url = html.url;
         if (html.encrypt == '1') {
             url = unescape(url)
         } else if (html.encrypt == '2') {
             url = unescape(base64Decode(url))
         }
         if (/\\.m3u8|\\.mp4/.test(url)) {
             input = {
                 jx: 0,
                 url: url,
                 parse: 0
             }
         } else {
             input
         }
     `, 
     limit: 6,
     class_name:'电影&剧集&动漫',
     class_url:'1&2&3',
     tab_exclude:'SN|KK|LS|阿里|夸克',
     double: false, // 推荐内容是否双层定位
     推荐: '.public-list-exp;a&&title;img&&data-src;.ft2&&Text;a&&href',
     一级:`js:
        let body = input.split("#")[1];
        let t = Math.round(new Date / 1e3).toString();
        let key = md5("DS" + t + "DCC147D11943AF75");
        let url = input.split("#")[0];
        body = body + "&time=" + t + "&key=" + key;
        print(body);
        fetch_params.body = body;
        let html = post(url, fetch_params);
        let data = JSON.parse(html);
        VODS = data.list.map(function(it) {
            it.vod_pic = it.vod_pic.replace(/mac/, "https");
            return it
        });
     `,
     搜索: '.public-list-box;.thumb-txt&&Text;.public-list-exp&&img&&data-src;.public-list-prb&&Text;a&&href'
    }