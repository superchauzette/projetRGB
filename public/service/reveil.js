var leverSoleil = require("./leverSoleil.js");
var CronJob = require('cron').CronJob;

module.exports = {
	set 	: set,
	get 	: get,
	reset 	: reset,
	active 	: active
};


var job;
var hm = ["00","00"];
var mday = "0,1,2,3,4,5";
var on = false;

function set(hour, day){

	hm =  hour.split(":");
	mday = day.substring(1 , day.length);

	var cronTime = '00 '+ hm[1] +' '+ hm[0]+ ' * * ' + mday;
	console.log(cronTime);

	reset();

	if(on){
		job = new CronJob({
		  cronTime: cronTime,
		  onTick: function() {
		    leverSoleil.sunrise();
		  },
		  start: false
		 // timeZone: "America/Los_Angeles"
		});

		job.start();
	}		
}

function get(){
	return {
		hour : hm.join(":"),
		day : mday,
		on : on
	}
}

function reset(){
	if(job != null) job.stop();
}

function active(val){
	on = val;
	if(!on){
		reset();
	}
}