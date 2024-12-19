import React, { useState, useEffect, useRef } from "react";
// INTERNAL IMPORT

import { useStateContext } from "../../../Context/index";

const Booking = ({ registerDoctors }) => {
  const { BOOK_APPOINTMENT, setAppointmentMessage } = useStateContext(); // Paso 2.1: Importa setAppointmentMessage

  const [bookingDoctor, setBookingDoctor] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda para filtrar doctores
  const [showDropdown, setShowDropdown] = useState(false); // Controla la visibilidad del desplegable
  const dropdownRef = useRef(null); // Referencia para detectar clics fuera del menú desplegable
  const [booking, setBooking] = useState({
    from: "09:30",
    to: "17:00",
    appointmentDate: "24-01-01",
    condition: "-",
    message: "-",
  });

  const handleDoctorSelect = (doctor) => {
    setSearchTerm(
      `${doctor.firstName} ${doctor.lastName} (${doctor.specialization})`
    );
    setBookingDoctor(doctor);
    setShowDropdown(false); // Cierra el desplegable después de la selección
  };

  // Filtra la lista de doctores según el término de búsqueda solo si registerDoctors está definido
  const filteredDoctors = registerDoctors
    ? registerDoctors.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Maneja clics fuera del menú desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Book Appointment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div>
              <div className="row">
                {/* Input para búsqueda con opciones filtradas */}
                <div
                  className="col-xl-12 mb-3 position-relative"
                  ref={dropdownRef}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search or select a Professional..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                  />
                  {/* Desplegable con doctores filtrados */}
                  {showDropdown && (
                    <div
                      className="dropdown-menu show w-100"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.doctorID}
                          className="dropdown-item"
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          {doctor.firstName} {doctor.lastName} (
                          {doctor.specialization})
                        </div>
                      ))}
                      {filteredDoctors.length === 0 && (
                        <div className="dropdown-item text-muted">
                          No doctors found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => BOOK_APPOINTMENT(booking, bookingDoctor)}
              className="btn btn-primary"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
