const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //字符串变对象
const hashMap = xObject || [];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容 ， /.*意思是以/开头的后面的所以东西都有匹配到
};
const rander = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
              <div class="site">
                <div class="logo">
                ${node.logo}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon" >
                <use xlink:href="#icon-close"></use>
             </svg>
             </div>
              </div>
              
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();//阻止冒泡
      hashMap.splice(index, 1)
      rander()
    });
  });
};
rander();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url
  });
  rander();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //JSON.stringify把对象变成字符串
  localStorage.setItem("x", string); //在本地的存储里设置x，x里的值就是string
};

// 天气
let str = ''
  $.ajax({

    url: "//saweather.market.alicloudapi.com/ip-to-weather",
    data: {ip: '',
    },
    type: "get",

    dataType: "json",
    success: function (data) {
  
      let today_weather_pic = data.showapi_res_body.f1.day_weather_pic

      let tomorrow_weather_pic = data.showapi_res_body.f2.day_weather_pic

      let tomorrowWeather = data.showapi_res_body.f2.day_weather +'/'+data.showapi_res_body.f2.night_weather

      let todayWeather = data.showapi_res_body.f1.day_weather +'/'+data.showapi_res_body.f1.night_weather

      let tomorrowTemperature = data.showapi_res_body.f2.day_air_temperature +'°C/'+data.showapi_res_body.f2.night_air_temperature+'°C'
      
      let todayTemperature = data.showapi_res_body.f1.day_air_temperature +'°C/'+data.showapi_res_body.f1.night_air_temperature+'°C'

      let area = data.showapi_res_body.cityInfo.c5+' '+data.showapi_res_body.cityInfo.c3

      $('.weather-window .area').html(area)
      $('.weather-window .todayTemperature').html(todayTemperature)
      $('.weather-window .tomorrowTemperature').html(tomorrowTemperature)
      $('.weather-window .todayWeather ').html(todayWeather)
      $('.weather-window .tomorrowWeather ').html(tomorrowWeather)

      $(".today_weather_pic1").attr('src',today_weather_pic);
      $(".tomorrow_weather_pic1").attr('src',tomorrow_weather_pic);
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "APPCODE daacf04e8e8a434994f19f752ff42817");
    }
  })

const Weather = {
  open(){
   this.weather = 
   document.querySelector('.weather .icon-weather')
   this.weather1=
   document.querySelector('.weather .weather-window')
   this.bind()
  },
  bind(){
    this.weather.onclick = ()=>{
  this.weather1.classList.add('open')
  close = window.setTimeout(()=>{
    this.weather1.classList.remove('open')
  },5000)
    }
  }
}
Weather.open()
Weather.bind()
