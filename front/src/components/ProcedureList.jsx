import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Procedure from "./Procedure";
import styles from "../styles/Procedures.module.css";
import Pagination from 'react-bootstrap/Pagination';

function ExcursionList() {
  const { procedures, error } = useContext(StateContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const itemsPerPage = 12;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
    setCurrentPage(1);
  };

  const sortedProcedures = [...procedures].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "date") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return 0;
    }
  });

  const filteredProcedures = sortedProcedures.filter(procedure =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProcedure = currentPage * itemsPerPage;
  const indexOfFirstProcedure = indexOfLastProcedure - itemsPerPage;
  const currentProcedures = filteredProcedures.slice(indexOfFirstProcedure, indexOfLastProcedure);

  const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    let items = [];
    items.push(
      <Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />
    );
    items.push(
      <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
    );
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    );
    items.push(
      <Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
    );

    return items;
  };

  const { proceduresList, proceduresPagination, searchContainer, searchInput, sortContainer, sortSelect } = styles;
  return (
    <>
      <div className={searchContainer}>
        <input
          type="text"
          className={searchInput}
          placeholder="Search procedures..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className={sortContainer}>
          <select className={sortSelect} value={sortCriteria} onChange={handleSortChange}>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>
      <div className={proceduresList}>
        {currentProcedures.map((procedure) => (
          <Procedure procedure={procedure} key={procedure._id} />
        ))}
      </div>
      <div className={proceduresPagination}>
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
      {error}
    </>
  );
}

export default ExcursionList;
