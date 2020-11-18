var staticCacheName = "pwa"; 
  
var filesToCache = [
	'/',
	'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu'
]


self.addEventListener("install", function (e) { 
  e.waitUntil( 
    caches.open(staticCacheName).then(function (cache) { 
      return cache.addAll(filesToCache); 
    }) 
  ); 
}); 
  
self.addEventListener("fetch", function (event) { 
  console.log("fetch event fired and catch : " + event.request.url); 
  
  event.respondWith( 
    caches.match(event.request).then(function (response) { 
      return response || fetch(event.request,{mode: 'no-cors'}); 
    }) 
  ); 
}); 

