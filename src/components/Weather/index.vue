<template lang="">
	<el-card shadow="hover" class ="box-card" >
	  <div slot="header"
           class="clearfix">
        <span>每日天气</span>
      </div>
			<div class="showBlock">
					<p class="address">{{address}}</p>
					<p class="temperature">{{temperature}}℃<span class="weather">{{weather}} <span><i class="mainWeather"
													:class="getIcon"></i></span></span></p>


					<div class="other">
							<p class="wind"><i class="el-icon-wind-power"></i>
									风向:<span>{{winddirection}}</span>&nbsp;&nbsp;&nbsp;<span style="margin-left:10px">风力:{{windpower}}级</span></p>
							<p class="humidity"><i class="el-icon-odometer"></i> 湿度:{{humidity}}</p>
							<p id="reporttime">消息发布时间:{{reporttime}}</p>
					</div>
			</div>
	</el-card>
</template>
<script>

import { getWeather } from '@/api/weather'
export default {
  name: 'Weather',
  data () {
    return {
      address: '',
      weather: '',
      temperature: '',
      winddirection: '',
      windpower: '',
      humidity: '',
      reporttime: '',
      icon: true
    }
  },
  created () {
    this.localWeather()
  },
  computed: {
    getIcon () {
      this.icon = false
      if (this.weather == '晴') {
        return 'el-icon-sunny'
      } else if (this.weather == '多云') {
        return 'el-icon-cloudy-and-sunny'
      } else if (this.weather == '阴') {
        return 'el-icon-partly-cloudy'
      } else if (this.weather.indexOf('雨')) {
        return 'el-icon-heavy-rain'
      } else if (this.weather.indexOf('雪')) {
        return 'el-icon-light-rain'
      }
      this.icon = true
    }
  },
  methods: {
    localWeather () {
      getWeather().then(res => {
        console.log(res)
        let lives = res.data.lives[0]
        this.address = lives.city
        this.temperature = lives.temperature
        this.weather = lives.weather
        this.winddirection = lives.winddirection
        this.windpower = lives.windpower
        this.humidity = lives.humidity
        this.reporttime = lives.reporttime
      })
    }
  }
}
</script>
<style scoped>
.ipAddress {
  margin-top: 10px;
}

.el-card {
  background-color: rgba(245, 255, 250, 0.8);

  color: #000;
}

.showBlock {
  margin-top: 10px;
}

.temperature {
  font-size: 50px;
}

.weather {
  margin-left: 20px;
  font-size: 35px;
}

.address {
  font-size: 20px;
}

.other {
  margin-top: 10px;
}

.other p {
  margin-top: 10px;
  font-size: 18px;
}

#reporttime {
  margin-top: 10px;
  font-size: 14px;
}

.mainWeather {
  float: right;
  margin-top: 10px;
  margin-right: 10%;
  font-size: 120px;
}

.showBlock {
  margin-left: 10px;
}
</style>