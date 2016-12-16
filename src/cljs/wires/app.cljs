(ns wires.app
  (:require [cljsjs.pixi]))

(def keymap
  {37 :left
   38 :up
   39 :right
   40 :down})

(defn get-texture [texture-name]
  (aget (.-resources js/PIXI.loader) texture-name "texture"))

(defn create-sprite [texture-name]
  (js/PIXI.Sprite. (get-texture texture-name)))

(defn on-key-down [game-state event]
  "Handle keydown event"
  (let [k (keymap (.-keyCode event))]
     (swap! game-state update :pressed-keys conj k)))

(defn on-key-up [game-state event]
  "Handle keyup event"
  (let [k (keymap (.-keyCode event))]
     (swap! game-state update :pressed-keys disj k)))

(defn is-pressed? [game-state k]
  "Is the key k pressed ?"
  (if (k (:pressed-keys game-state))
    true
    false))

(defn motion [game]
  (let [speed 1
        x (if (is-pressed? game :left) (- speed) 0)
        x (if (is-pressed? game :right) (+ speed x) x)
        y (if (is-pressed? game :up) (- speed) 0)
        y (if (is-pressed? game :down) (+ speed y) y)]
    [x y]))

(defn step! [{:keys [sprites] :as game-state}]
  "Update the game state"
  (let [ghost (first sprites)
        ghost-x (.-x ghost)
        ghost-y (.-y ghost)
        [dx dy] (motion game-state)]
    (set! (.-x ghost) (+ dx ghost-x))
    (set! (.-y ghost) (+ dy ghost-y))
    game-state))


(defonce app-state (atom {}))

(defonce renderer (js/PIXI.autoDetectRenderer 256 256))
(defonce stage (js/PIXI.Container.))
(defn game-loop []
  "Testing a basic loop ?"
  (js/requestAnimationFrame game-loop)
  (swap! app-state step!)
  (.render renderer stage))

(defn start! []
  (do
    (.. js/document -body (appendChild (.-view renderer)))
    (let [ghost (create-sprite "ghost")
          game {:sprites [ghost]
                :pressed-keys #{}}]
      (.addChild stage ghost)
      (js/window.addEventListener
        "keydown"
        #(on-key-down app-state %)
        false)
      (js/window.addEventListener
        "keyup"
        #(on-key-up app-state %)
        false)
      (reset! app-state game))
    (game-loop)))

(defn load-resources! []
  (-> js/PIXI.loader
      (.add "ghost" "ghost.png")
      (.load start!)))

(defonce boot! (load-resources!))
(defn init [])
