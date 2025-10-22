package utn.tiendas_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tiendas_libros.modelo.Libro;
import utn.tiendas_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Component
public class LibroFrom extends JFrame {

    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        iniciarForma();


        agregarButton.addActionListener(e -> agregarLibro());
        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();

            }
        });

        modificarButton.addActionListener(e -> modificarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());
    }

    private void iniciarForma() {
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
        //Para otener las dimenciones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - this.getSize().width) / 2;
        int y =  (tamanioPantalla.height - this.getSize().height) / 2;
        setLocation(x, y);
    }

    private void agregarLibro() {
        //Leer los valores del formulario
        if(libroTexto.getText().equals("")){
            mostrarMensaje("Ingresa el nombre del libro.");
            libroTexto.requestFocusInWindow();
            return;
        }
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        var libro = new Libro(null,  nombreLibro, autor, precio, existencias);
        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Libro agregado correctamente.");
        limpiarFormulario();
        listarLibros();
    }

    private void cargarLibroSeleccionado() {
        int renglon = tablaLibros.getSelectedRow();
        if (renglon != -1) {
            idTexto.setText(tablaLibros.getValueAt(renglon, 0).toString());
            libroTexto.setText(tablaLibros.getValueAt(renglon, 1).toString());
            autorTexto.setText(tablaLibros.getValueAt(renglon, 2).toString());
            precioTexto.setText(tablaLibros.getValueAt(renglon, 3).toString());
            existenciasTexto.setText(tablaLibros.getValueAt(renglon, 4).toString());
        }
    }

    private void modificarLibro() {
        if(this.idTexto.getText().equals("")){
            mostrarMensaje("Debes seleccionar un registro en la tabla.");
        }
        else {
            if(libroTexto.getText().equals("")){
                mostrarMensaje("Digite el nombre del libro.");
                libroTexto.requestFocusInWindow();
                return;
            }

            int idLibro =  Integer.parseInt(idTexto.getText());
            var nombreLibro = libroTexto.getText();
            var autor = autorTexto.getText();
            var precio = Double.parseDouble(precioTexto.getText());
            var existencias = Integer.parseInt(existenciasTexto.getText());
            var libro = new Libro(idLibro, nombreLibro, autor, precio, existencias);
            libroServicio.guardarLibro(libro);
            mostrarMensaje("Libro modificado correctamente.");
            limpiarFormulario();
            listarLibros();
        }

    }

    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        idTexto =  new JTextField();
        idTexto.setVisible(false);

        // TODO: place custom component creation code here
        //evitamos que se modifiquen las tablas y se seleccionen varias celdas
        this.tablaModeloLibros = new DefaultTableModel(0, 5){
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        //Instanciar el objeto JTable
        this.tablaLibros = new JTable(this.tablaModeloLibros);
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();

    }

    private void listarLibros() {

        //Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        //Obtener los libros de la BD
        var libros = libroServicio.listarLibros();
        //Iteramos cada libro
        libros.forEach((libro) -> {
            //Creamos cada registro para agregarlos a la tabla
            Object [] reglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(reglonLibro);
        });

    }

    private void eliminarLibro() {
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1) {
            String idLibro = tablaLibros.getValueAt(renglon, 0).toString();
            var libro = new Libro();
            libro.setIdLibro(Integer.parseInt(idLibro));
            libroServicio.eliminarLibro(libro);
            mostrarMensaje("Libro eliminado correctamente.");
            listarLibros();
        }

    }
}
