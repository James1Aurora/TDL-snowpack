import confetti from 'canvas-confetti';
import { v4 as uuidv4 } from 'uuid';

// Membuat confetti (pastikan canvas ada di HTML)
confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

// Tipe Task
type Task = { id: string; title: string; completed: boolean; createdAt: Date; };

// Referensi elemen
const list = document.querySelector<HTMLUListElement>("#list")!;
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector("#new-task-title") as HTMLInputElement;

// Array untuk menyimpan tasks
const tasks: Task[] = [];

// Event listener untuk form
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
  console.log(tasks);  // Cek isi array tasks
  addListItem(newTask);
  input.value = "";
});

// Fungsi untuk menambahkan task ke list
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  console.log("Adding item to list:", task.title);  // Cek apakah item ditambahkan

  checkbox.addEventListener("change", () => {
    task.completed = !task.completed;
    item.style.textDecoration = task.completed ? "line-through" : "none";
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  item.id = task.id;  // Set ID unik untuk task

  list?.append(item);
}
