
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyDetails } from '@/types/company';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<CompanyDetails | null>(null);

  useEffect(() => {
    // Simulating API call to fetch company details
    const fetchCompanyDetails = async () => {
      try {
        // This would be replaced with actual API call
        const response = await fetch(`/api/companies/${id}`);
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  if (!company) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
          <p className="text-gray-500">{company.headline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Company Details</h2>
            <p className="text-gray-600">Location: {company.location}</p>
            <p className="text-gray-600">Founded: {company.founded_date}</p>
            <p className="text-gray-600">Team Size: {company.team_size}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{company.generated_description}</p>
          </div>

          {company.founders && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Founders</h2>
              <div className="space-y-4">
                {company.founders.map((founder, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold">{founder.name}</h3>
                    <p className="text-gray-600">{founder.description}</p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsPage;
