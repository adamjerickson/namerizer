layers = Framer.Importer.load("imported/test2")

// Demo code
// Bounce all the views
// for (layerName in layers) {

// 	var layer = layers[layerName];

// 	layer.on(Events.Click, function(event, layer) {

// 		// Wind up the layer by making it smaller
// 		layer.scale = 0.7

// 		// Animate the layer back to the original size with a spring
// 		layer.animate({
// 			properties: {scale:1.0},
// 			curve: "spring",
// 			curveOptions: {
// 				friction: 15,
// 				tension: 1000,
// 			}
// 		})

// 		// Only animate this layer, not other ones below
// 		event.stopPropagation()
// 	})
// }


// Hide anything outside our small mobile view so that we can simulate scrolling properly.
layers.Mobile_View_Selections.style["overflow"] = 'hidden';


layers.ScrollingList.scroll = true;
layers.ScrollingList.y = 50;


