import React from "react";
import "./style/style.css";
import { CSS, DynamicCSS } from "electron-css";
import { Dark } from "../ui/theme";
import interact from "interactjs";
import { useHistory } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
const Theme = DynamicCSS();
Theme.use(Dark.Theme);
interact(".completed").dropzone({
    accept: "#yes-drop",
    overlap: 0.75,
    ondropactivate: function (event) {
        event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop-completed");
        draggableElement.textContent = "Dragged in";
    },
    ondragleave: function (event) {
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop-completed");
        event.relatedTarget.textContent = "Dragged out";
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
    },
});
interact(".code-review").dropzone({
    accept: "#yes-drop",
    overlap: 0.75,
    ondropactivate: function (event) {
        event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop-code-review");
        draggableElement.textContent = "Dragged in";
    },
    ondragleave: function (event) {
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop-code-review");
        event.relatedTarget.textContent = "Dragged out";
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
    },
});

interact(".in-progress").dropzone({
    accept: "#yes-drop",
    overlap: 0.75,
    ondropactivate: function (event) {
        event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop-in-progress");
        draggableElement.textContent = "Dragged in";
    },
    ondragleave: function (event) {
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop-in-progress");
        event.relatedTarget.textContent = "Dragged out";
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
    },
});

interact(".todos").dropzone({
    accept: "#yes-drop",
    overlap: 0.75,
    ondropactivate: function (event) {
        event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;
        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop-todos");
        draggableElement.textContent = "Dragged in";
    },
    ondragleave: function (event) {
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop-todos");
        event.relatedTarget.textContent = "Dragged out";
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
    },
});

interact(".drag-drop").draggable({
    inertia: false,
    modifiers: [
        interact.modifiers.restrictRect({
            endOnly: true,
        }),
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener },
});

function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

const Nav = () => {
    const history = useHistory();

    ipcRenderer.on("test", () => {
        history.push("/Settings");
    });

    return (
        <div>
            <div className="home-wrapper">
                <div id="todo-dropzone" className="todos">
                    <h1>Todos</h1>
                    <div id="yes-drop" class="drag-drop"></div>
                </div>
                <div id="in-progress-dropzone" className="in-progress">
                    <h1>In Progress</h1>
                </div>
                <div id="code-review-dropzone" className="code-review">
                    <h1>Code review</h1>
                </div>
                <div id="completed-dropzone" className="completed">
                    <h1>Completed</h1>
                </div>
            </div>
        </div>
    );
};

export default Nav;
