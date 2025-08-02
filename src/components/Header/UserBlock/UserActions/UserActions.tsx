/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./UserActions.css";
import loading_icon from "../../../../assets/loading_icon.svg";

interface UserActionsProps {
  isLoading: boolean;
}

interface CompanyInfo {
  usedCompanyCount: number;
  companyLimit: number;
}

interface ApiResponse {
  eventFiltersInfo: {
    usedCompanyCount: number;
    companyLimit: number;
  };
}

const UserActions: React.FC<UserActionsProps> = ({
  isLoading: propIsLoading,
}) => {
  const [usedCompanyCount, setUsedCompanyCount] = useState<number>(0);
  const [companyLimit, setCompanyLimit] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const isOverallLoading = propIsLoading || isFetching;

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      setIsFetching(true);
      const url = "https://gateway.scan-interfax.ru/api/v1/account/info";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount);
        setCompanyLimit(data.eventFiltersInfo.companyLimit);
      } catch (error) {
        console.error("Ошибка при получении информации о компаниях:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCompanyInfo();

    const intervalId = setInterval(fetchCompanyInfo, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="user-actions-rectangle">
      {isOverallLoading ? (
        <img src={loading_icon} alt="Loading" className="loading-icon" />
      ) : (
        <div className="user-actions-data">
          <div className="action-item">Использовано компаний</div>
          <div className="number-item used-companies-number">
            {usedCompanyCount}
          </div>
          <div className="action-item">Лимит по компаниям</div>
          <div className="number-item limit-companies-number">
            {companyLimit}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
