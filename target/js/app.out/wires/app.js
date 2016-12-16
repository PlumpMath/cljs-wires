// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants true}
goog.provide('wires.app');
goog.require('cljs.core');
wires.app.keymap = new cljs.core.PersistentArrayMap(null, 4, [(37),cljs.core.cst$kw$left,(38),cljs.core.cst$kw$up,(39),cljs.core.cst$kw$right,(40),cljs.core.cst$kw$down], null);
wires.app.get_texture = (function wires$app$get_texture(texture_name){
return (PIXI.loader.resources[texture_name]["texture"]);
});
wires.app.create_sprite = (function wires$app$create_sprite(texture_name){
return (new PIXI.Sprite(wires.app.get_texture(texture_name)));
});
wires.app.on_key_down = (function wires$app$on_key_down(game_state,event){

var k = (function (){var G__12869 = event.keyCode;
return (wires.app.keymap.cljs$core$IFn$_invoke$arity$1 ? wires.app.keymap.cljs$core$IFn$_invoke$arity$1(G__12869) : wires.app.keymap.call(null,G__12869));
})();
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(game_state,cljs.core.update,cljs.core.cst$kw$pressed_DASH_keys,cljs.core.conj,cljs.core.array_seq([k], 0));
});
wires.app.on_key_up = (function wires$app$on_key_up(game_state,event){

var k = (function (){var G__12871 = event.keyCode;
return (wires.app.keymap.cljs$core$IFn$_invoke$arity$1 ? wires.app.keymap.cljs$core$IFn$_invoke$arity$1(G__12871) : wires.app.keymap.call(null,G__12871));
})();
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(game_state,cljs.core.update,cljs.core.cst$kw$pressed_DASH_keys,cljs.core.disj,cljs.core.array_seq([k], 0));
});
wires.app.is_pressed_QMARK_ = (function wires$app$is_pressed_QMARK_(game_state,k){

if(cljs.core.truth_((function (){var G__12873 = cljs.core.cst$kw$pressed_DASH_keys.cljs$core$IFn$_invoke$arity$1(game_state);
return (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1(G__12873) : k.call(null,G__12873));
})())){
return true;
} else {
return false;
}
});
wires.app.motion = (function wires$app$motion(game){
var speed = (1);
var x = (cljs.core.truth_(wires.app.is_pressed_QMARK_(game,cljs.core.cst$kw$left))?(- speed):(0));
var x__$1 = (cljs.core.truth_(wires.app.is_pressed_QMARK_(game,cljs.core.cst$kw$right))?(speed + x):x);
var y = (cljs.core.truth_(wires.app.is_pressed_QMARK_(game,cljs.core.cst$kw$up))?(- speed):(0));
var y__$1 = (cljs.core.truth_(wires.app.is_pressed_QMARK_(game,cljs.core.cst$kw$down))?(speed + y):y);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$1,y__$1], null);
});
wires.app.step_BANG_ = (function wires$app$step_BANG_(p__12874){
var map__12880 = p__12874;
var map__12880__$1 = ((((!((map__12880 == null)))?((((map__12880.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__12880.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12880):map__12880);
var game_state = map__12880__$1;
var sprites = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12880__$1,cljs.core.cst$kw$sprites);

var ghost = cljs.core.first(sprites);
var ghost_x = ghost.x;
var ghost_y = ghost.y;
var vec__12882 = wires.app.motion(game_state);
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12882,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12882,(1),null);
ghost.x = (dx + ghost_x);

ghost.y = (dy + ghost_y);

return game_state;
});
if(typeof wires.app.app_state !== 'undefined'){
} else {
wires.app.app_state = (function (){var G__12885 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12885) : cljs.core.atom.call(null,G__12885));
})();
}
if(typeof wires.app.renderer !== 'undefined'){
} else {
wires.app.renderer = PIXI.autoDetectRenderer((256),(256));
}
if(typeof wires.app.stage !== 'undefined'){
} else {
wires.app.stage = (new PIXI.Container());
}
wires.app.game_loop = (function wires$app$game_loop(){

requestAnimationFrame(wires.app.game_loop);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(wires.app.app_state,wires.app.step_BANG_);

return wires.app.renderer.render(wires.app.stage);
});
wires.app.start_BANG_ = (function wires$app$start_BANG_(){
document.body.appendChild(wires.app.renderer.view);

var ghost_12900 = wires.app.create_sprite("ghost");
var game_12901 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$sprites,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ghost_12900], null),cljs.core.cst$kw$pressed_DASH_keys,cljs.core.PersistentHashSet.EMPTY], null);
wires.app.stage.addChild(ghost_12900);

var G__12894_12902 = "keydown";
var G__12895_12903 = ((function (G__12894_12902,ghost_12900,game_12901){
return (function (p1__12886_SHARP_){
return wires.app.on_key_down(wires.app.app_state,p1__12886_SHARP_);
});})(G__12894_12902,ghost_12900,game_12901))
;
var G__12896_12904 = false;
window.addEventListener(G__12894_12902,G__12895_12903,G__12896_12904);

var G__12897_12905 = "keyup";
var G__12898_12906 = ((function (G__12897_12905,ghost_12900,game_12901){
return (function (p1__12887_SHARP_){
return wires.app.on_key_up(wires.app.app_state,p1__12887_SHARP_);
});})(G__12897_12905,ghost_12900,game_12901))
;
var G__12899_12907 = false;
window.addEventListener(G__12897_12905,G__12898_12906,G__12899_12907);

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(wires.app.app_state,game_12901) : cljs.core.reset_BANG_.call(null,wires.app.app_state,game_12901));

return wires.app.game_loop();
});
wires.app.load_resources_BANG_ = (function wires$app$load_resources_BANG_(){
return PIXI.loader.add("ghost","ghost.png").load(wires.app.start_BANG_);
});
if(typeof wires.app.boot_BANG_ !== 'undefined'){
} else {
wires.app.boot_BANG_ = wires.app.load_resources_BANG_();
}
wires.app.init = (function wires$app$init(){
return null;
});
