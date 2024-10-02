use firebase_rs::*;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
struct Task {
    id: String,
    title: String,
    completed: bool,
}

#[tokio::main]
async fn main() {
    // Carregar credenciais da conta de serviço
    let mut file = File::open("/crud-e10cf-firebase-adminsdk-v94bg-17f85e6cc9.json")
        .expect("Arquivo JSON não encontrado");
    let mut service_account_key = String::new();
    file.read_to_string(&mut service_account_key)
        .expect("Erro ao ler o arquivo JSON");

    // Conectar ao Firebase
    let firebase = Firebase::new("https://<seu-projeto>.firebaseio.com/")
        .unwrap()
        .auth(Some(service_account_key))
        .await
        .unwrap();

    // Criar uma nova tarefa
    let new_task = Task {
        id: Uuid::new_v4().to_string(),
        title: "Aprender Rust com Firebase".to_string(),
        completed: false,
    };

    // Adicionar a nova tarefa ao Firestore
    let response = firebase.at(&format!("tasks/{}", new_task.id))
        .set(&new_task)
        .await
        .unwrap();

    println!("Tarefa criada: {:?}", response);

    // Ler tarefas do Firestore
    let task: Task = firebase.at(&format!("tasks/{}", new_task.id))
        .get()
        .await
        .unwrap();

    println!("Tarefa lida: {:?}", task);
}
