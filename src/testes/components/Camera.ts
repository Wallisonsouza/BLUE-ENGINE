import Component from "../engine/base_component";
import Mathf from "../static/Mathf";
export default class Camera extends Component {
    public zoom: number = 1;

    constructor(){
        super();
        window.addEventListener("wheel", (event) => {

            if(event.ctrlKey) {

                this.zoom -= event.deltaY * 0.01;
                this.zoom = Mathf.clamp(this.zoom, 0, 1000);
                event.preventDefault();
                
            }
        }, {passive: false});

        window.addEventListener("gesturestart", function(event) {
            event.preventDefault();
        });
        
        window.addEventListener("gesturechange", function(event) {
            event.preventDefault();
        });
        
        window.addEventListener("gesture", function(event) {
            event.preventDefault();
        });

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
        
    }
}
