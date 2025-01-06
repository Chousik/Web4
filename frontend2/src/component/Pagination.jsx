import React from 'react';

export default function Pagination({
                                       totalResults,
                                       resultsPerPage,
                                       currentPage,
                                       paginate,
                                   }) {
    const pageNumbers = Array.from(
        { length: Math.ceil(totalResults / resultsPerPage) },
        (_, i) => i + 1
    );

    return (
        <div className="pagination">
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}https://tailwindui.com/
                    onClick={() => paginate(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
}
