let input = document.querySelector('#input');
let wrapper = document.querySelector('#wrapper');
let imageWidthSize = document.querySelector('#imageWidthSize');

input.addEventListener('change', (event) => {
	const WIDTH = imageWidthSize.value;

	console.log(WIDTH);

	let image_file = event.target.files[0];

	let reader = new FileReader();
	reader.readAsDataURL(image_file);

	reader.onload = (event) => {
		let image_url = event.target.result;
		let image = document.createElement('img');
		image.src = image_url;

		image.onload = (event) => {
			let canvas = document.createElement('canvas');
			let ratio = WIDTH / event.target.width;

			canvas.width = WIDTH;
			canvas.height = event.target.height * ratio;

			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0, canvas.width, canvas.height);

			let new_image_url = context.canvas.toDataURL('image/png', 90);
			let new_image = document.createElement('img');
			new_image.src = new_image_url;

			wrapper.innerHTML = '';
			wrapper.appendChild(new_image);
		};
	};
});
