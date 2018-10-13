function TriggerCallback() {

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:3600/get", true);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
           
           const data = xmlhttp.responseText; //data -> string
           const response = JSON.parse(data); //data1 -> object
           const data1 = response.data;

	        //promise to resolve callback hell
		    const promise = new Promise((resolve, reject) => { //level 1

		    	const box1 = document.createElement('div');
		    	box1.setAttribute('class', 'box');
		    	document.getElementById('content').appendChild(box1);

		    	for (let key in data1) { 

		    		let ele = document.createElement('div');
		    		ele.setAttribute('id', '1'+ key);
		    		box1.appendChild(ele);

		    		document.getElementById('1'+ key).innerHTML = data1[key].name;
		    	};

		    	resolve("level1 Success!");

		    	setTimeout(() => reject(new Error("Whoops!")), 1000);
		    	
		    }).then(function(value) { //level 2
		    	console.log(value);

		    	return new Promise((resolve, reject) => {
		    		const box2 = document.createElement('div');
			    	box2.setAttribute('class', 'box');
			    	document.getElementById('content').appendChild(box2);

				    for (let key in data1) { 

				    	let ele = document.createElement('div');
			    		ele.setAttribute('id', '2'+ key);
			    		box2.appendChild(ele);

			    		document.getElementById('2'+ key).innerHTML = data1[key].gender;
			    	};

			    	resolve("level2 Success!");

		    	});

		    }).then(function(value) { //level 3
		    	console.log(value);

		    	return new Promise((resolve, reject) => {
		    		
		    		const box3 = document.createElement('div');
			    	box3.setAttribute('class', 'box');
			    	document.getElementById('content').appendChild(box3);

				    for (let key in data1) { 

				    	let ele = document.createElement('div');
			    		ele.setAttribute('id', '3'+ key);
			    		box3.appendChild(ele);

			    		document.getElementById('3'+ key).innerHTML = data1[key].age;
			    	};

			    	resolve("level3 Success!");

		    	});

		    }).then(function(value) { //level 4
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		const h2 = document.createElement('h2');
		    		let nation = document.createTextNode("Nation");
		    		h2.appendChild(nation);
			    	setTimeout(() => document.getElementById('title').appendChild(h2), 1000);

		    		const box4 = document.createElement('div');
			    	box4.setAttribute('class', 'box');
			    	document.getElementById('content').appendChild(box4);

				    for (let key in data1) { 

				    	let ele = document.createElement('div');
			    		ele.setAttribute('id', '4'+ key);
			    		box4.appendChild(ele);

			    		setTimeout(() => document.getElementById('4'+ key).innerHTML = data1[key].nation, 1000);
			    	}

		    		resolve("level4 Success!");

		    	});

		    }).then(function(value) { //level 5
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		let box5 = document.createElement('p');
			    	let span = document.createElement('span');
			    	let line1 = document.createTextNode("(Please wait 1s to see the results)")
			    	span.appendChild(line1);
			    	span.style.color = 'red';
			    	box5.appendChild(span);
			    	let br = document.createElement('br');
			    	box5.appendChild(br);
			    	let line2 = document.createTextNode("The users whose name includes the character 'a' are: ");
			    	box5.appendChild(line2);
			    	document.body.appendChild(box5);

			    	for (let key in data1) { 

			    		let ele = document.createElement('span');
			    		ele.setAttribute('id', '5'+ key);
		    			box5.appendChild(ele);

			    		if(data1[key].name.includes('a')) {
			    			setTimeout(() => document.getElementById('5'+ key).innerHTML = data1[key].name + " ", 1000);		    		
			    		};
			    	};

			    	resolve("level5 Success!");
		    	});

		    }).then(function(value) { //level 6
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		let box6 = document.createElement('p');
			    	let line = document.createTextNode("How many females above? ")
			    	box6.appendChild(line);
			    	let ele = document.createElement('span');		
			    	box6.appendChild(ele);
			    	document.body.appendChild(box6);

			    	let count = 0;

			    	for (let key in data1) { 
		    			if(data1[key].gender === "Female") {
		    				count++;
		    			}
			    	};
			    	setTimeout(() => ele.innerHTML = count, 1000);	

			    	resolve("level6 Success!");

		    	});

		    }).then(function(value) { //level 7
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		let box7 = document.createElement('p');
			    	let line = document.createTextNode("Please find out the youngest user: ")
			    	box7.appendChild(line);
			    	let ele = document.createElement('span');
		    		box7.appendChild(ele);
			    	document.body.appendChild(box7);

			  		const arr = [];

			  		for(let key in data1) {
			  			const age = data1[key].age;
			  			arr.push(age);

			  			const min = Math.min.apply(Math, arr);
			  			if(data1[key].age === min) {
		    				setTimeout(() => ele.innerHTML = data1[key].name + " ", 1000);
		    			}
			  		}	
			  		resolve("level7 Success!");
		    	});

		    }).then(function(value) { //level 8
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		let matches = document.querySelectorAll("div.box:first-child > div");
			    		
		    		for(let i=0; i<matches.length; i++) {
		    			matches[i].className = "click";
		    			matches[i].addEventListener('click', function() {
		    				for(let key in data1) {
		    					key = i+1;
		    					alert(data1[key].name + " is a " + data1[key].age + "-" + 
			    					data1[key].gender + ", whose nationality is " + data1[key].nation);
		    					break;
		    				}
		    			})
		    		}
		    		resolve("level8 Success!");
		    	});

		    }).then(function(value) { //level 9
		    	console.log(value);

		    	return new Promise((resolve, reject) => {

		    		let matches = document.querySelectorAll("div.box:nth-child(2) > div");
		    		let arr = Array.from(matches).forEach(function(el) {
		    			if (el.innerHTML === "Female") {
		    				setTimeout(() => el.className = "yellow", 1000);
		    			}
		    		});

		    		resolve("level9 Success!");
		    	});

	    	}).then(function(value) { //level 10
	    		console.log(value);

	    		return new Promise((resolve, reject) => {

	    			let matches = document.querySelectorAll("div.box:last-child > div");
		    		for(let i=0; i<matches.length; i++) {
		    			matches[i].className = "over";

		    			let ele = document.createElement('div');
		    			matches[i].addEventListener('mouseover', function() {

		    				for(let key in data1) {
		    					key = i+1;
		    					ele.setAttribute('class', 'addon');
					    		ele.setAttribute('id', '10'+ key);
					    		document.body.appendChild(ele);

			    				document.getElementById('10'+ key).innerHTML = data1[key].name + "'s nation is " + data1[key].nation;
			    				break;
		    				}
		    			});
		    			matches[i].addEventListener('mouseout', function() {
		    				
		    				ele.parentNode.removeChild(ele);
		    				
		    			});
		    		}
		    		resolve("level10 Success!");
	    		});

	    	}).then(function(value) {
	    		console.log(value);
	    	});

        }
    }

    xmlhttp.send();

}



