import confetti from 'canvas-confetti';
import { v4 as uuidv4 } from 'uuid';


confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });


type Task = { id: string; title: string; completed: boolean; createdAt: Date; };


const list = document.querySelector<HTMLUListElement>("#list")!;
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector("#new-task-title") as HTMLInputElement;


const tasks: Task[] = [];


form?.addEventListener("submit", e => {
  e.preventDefault();
  console.log("Form submitted");

  if (!input.value) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  console.log(tasks);  
  addListItem(newTask);
  input.value = "";
});

// nambahin task ke list
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  console.log("Adding item to list:", task.title);  

  checkbox.addEventListener("change", () => {
    task.completed = !task.completed;
    item.style.textDecoration = task.completed ? "line-through" : "none";
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  item.id = task.id;  

  list?.append(item);
}
